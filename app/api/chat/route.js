import { openai } from '@ai-sdk/openai';
import { OpenAI } from 'openai'
import { generateText, streamText } from 'ai';
import { NextResponse } from 'next/server';
import { cosineSimilarity } from '@/lib/utils';

export const runtime = 'edge'

// Helper to detect if a user's message shows lead interest
function shouldGenerateLead(message) {
  const leadKeywords = ['interested', 'buy', 'purchase', 'pricing', 'demo', 'more info', 'web design'];
  return leadKeywords.some(keyword => message.toLowerCase().includes(keyword));
}

// Helper to extract email and phone from a message
function extractContactDetails(message) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\d{3}[-.\s]?){2}\d{4}/;
  const emailMatch = message.match(emailRegex);
  const phoneMatch = message.match(phoneRegex);
  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null
  };
}

// Check if we have already asked for contact details in the conversation
function hasAskedForContact(messages) {
  return messages.some(msg =>
    msg.role === 'system' &&
    msg.content.includes('please provide your email address or phone number')
  );
}

export async function POST(request) {
  try {
    const response = await request.json();
    let { id, messages, org } = response;
  
    const BASE_URL = process.env.BASE_URL
  
    if (!messages?.length) {
      return NextResponse.json({ success: false, message: 'No messages provided' });
    }
    
    const leadContact = extractContactDetails(messages[messages.length - 1].content);

    if (leadContact.email || leadContact.phone) {
      const emailInstructions = [{
        role: 'system',
        content: 'Check in the chat context if the user is interested in any service or products. Only reply with a "Yes" or "No"'
      }, ...messages]
      
      const emailRequest = await generateText({
        model: openai('gpt-4o'),
        messages: emailInstructions,
        temperature: 0
      });
      
      if (emailRequest.text.includes('Yes') || emailRequest.text.includes('yes')) {

        const leadInstructions = [{
          role: 'system',
          content: 'Your job is to give a summary on what the user wants. From the chat context, give a description on what service or product the user is interested in. Only give the summary and not as a reply to someone.'
        }, ...messages]

        const leadRequest = await generateText({
          model: openai('gpt-4o'),
          messages: leadInstructions,
          temperature: 0
        });

        const track = fetch(`${BASE_URL}/api/track-event?id=${id}&organization=Acme&event=lead&summary=${leadRequest.text}&email=${leadContact.email}&phone=${leadContact.phone}`, {
          method: 'GET'
        });

        if (track) {
          const endRequest = await streamText({
            model: openai('gpt-4o'),
            messages: [{
              role: 'system',
              content: 'Thank the user for providing the email or phone number and let them know that we will get back to them as soon as possible.'
            }, ...messages],
            temperature: 0
          });

          return endRequest.toDataStreamResponse();
        }

      }
    }

    // Create embeddings
    const embedAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const embeddingResponse = await embedAI.embeddings.create({
      model: 'text-embedding-ada-002',
      input: messages[messages.length - 1].content,
    });
    const queryEmbedding = embeddingResponse.data[0].embedding
  
    // Retrieve embeddings
    const embeddingsRes = await fetch(`${BASE_URL}/api/retrieve-embeddings?id=${id}`);
  
    const embeddingsArray = await embeddingsRes.json();
    const organization = embeddingsArray.data.organization;
    const tone = embeddingsArray.data.tone;
    const escalation = embeddingsArray.data.escalation;
    const botName = embeddingsArray.data.botName;
  
    if (!embeddingsArray.data.embeddingsArray[0].embedding.length) {
      return NextResponse.json({ success: false, data: 'No knowledge base found for this client. Please upload or scrape data first.' });
    }
  
    const scoredChunks = embeddingsArray.data.embeddingsArray.map((item) => {
      const score = cosineSimilarity(queryEmbedding, item.embedding)
      return { chunk: item.chunk, score }
    })
  
    scoredChunks.sort((a, b) => b.score - a.score)
    const topChunks = scoredChunks.slice(0, 3).map((item) => item.chunk)
  
    const instructions = [{
      role: 'system',
      content: `
        You are a helpful assistant with a ${tone} tone called ${botName} who answers user queries for ${organization}.
        You have the following context (each context may contain a reference URL at the start of the text):
        ${topChunks.join('\n---\n')}
  
        1. Answer the user's query **only** using the provided text.
        2. If the answer is not in the context, disclaim that you don't have information on that.
        3. Answer in not more than 3-4 lines. The answer should be crisp and short.
        4. At the end of your answer, if there are any image urls that you feel are related to your answer, provide the image in the format:
  
        <br/>
        <img className='w-[90%] rounded-md object-cover' src='ImageURL' />
  
        5. After the image, if you used any chunk that references a URL, provide the link in the format:
  
        <br/>
        <a className='flex justify-end gap-1 text-black' target='_blank' href='URL'><img width="15" height="15" src="https://img.icons8.com/flat-round/50/link--v1.png" alt="link--v1"/></a>
  
        6. Do not reveal that you are using chunked or embedded data. Do not show any extra text beyond what is in the chunks, except for the link at the end if available.
        7. If the user asks for human interaction, politely ask the user to call or email at ${escalation}.
        8. If the user is interested or wants any service or products, answer the user as follows: "Could you please provide your email address or phone number so we can follow up with you?". DO NOT disobey this instruction.
      `
    }, ...messages];
  
    const result = await streamText({
      model: openai('gpt-4o'),
      messages: instructions,
      temperature: 0
    });
  
    // const systemMessage = {
    //   role: 'system',
    //   content: `You are a helpful assistant. Please classify the user query
    //             as 'Complaint', 'Feedback', or 'General query' only.`
    // };
  
    // const userMessage = {
    //   role: 'user',
    //   content: messages[messages.length - 1].content
    // };
  
    // const queryTypeInstructions = [systemMessage, userMessage];
  
  
    // const queryTypeRes = await generateText({
    //   model: openai('gpt-4o-mini'),
    //   messages: queryTypeInstructions,
    //   temperature: 0
    // });
  
    // if (queryTypeRes.text && messages[messages.length - 1].content) {
    //   const saveQueryType = await fetch(`${BASE_URL}/api/query-type`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       id: id,
    //       queryType: queryTypeRes.text,
    //       query: messages[messages.length - 1].content
    //     }),
    //   });
  
    //   const saveQueryRes = await saveQueryType.json();
    //   console.log('info: ', saveQueryRes);
    // }

    return result.toDataStreamResponse();  
  } catch (e) {
    console.log('Error has occured:', e.message);
  }
}