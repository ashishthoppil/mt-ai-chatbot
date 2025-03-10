import { openai } from '@ai-sdk/openai';
import { OpenAI } from 'openai'
import { generateText, streamText, tool } from 'ai';
import { NextResponse } from 'next/server';
import { cosineSimilarity } from '@/lib/utils';
import { z } from 'zod';

export const runtime = 'edge'

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


const getResponseLength = (length) => {
  console.log('lengthlength', length);
  if (length === 'short') {
    return `Answer briefly in one or two sentences.`;
  } else if (length === 'medium') {
    return `Provide a concise but informative response in 5-6 sentences.`;
  } else if (length === 'long') {
    return `Give a detailed and in-depth explanation.`;
  }
  return `Answer in not more than 3-4 lines. The answer should be crisp and short.`;
}

const getImagePrompt = () => {
  return `
    IMPORTANT: At the end of your answer, if there are any image urls that you feel are related to your answer, provide the image in the format:
  
    <br/>
    <img className='w-[90%] rounded-md object-cover' src='ImageURL' />
  `
}

const getSourcePrompt = () => {
  return `
  IMPORTANT: After the image, if you used any chunk that references a URL, provide the link in the format:
  
  <br/>
  <div className='flex justify-end'><a className='flex items-center justify-end gap-1 text-gray-800 border-2 border-gray-300 px-2 py-1 rounded-md bg-gray-300' target='_blank' href='URL'>Source:<img width="13" height="13" src="https://img.icons8.com/ios-glyphs/50/external-link.png" alt="link--v1"/></a></div>
  `
}

export async function POST(request) {
  try {
    const response = await request.json();
    let { id, messages, org } = response;
    const BASE_URL = process.env.BASE_URL

    const myToolSet = {
      create_lead: tool({
        description: 'When user is interested in a service or product. Example: I am interested in your service, I need help with an ad campaign, I want to buy a product.',
        parameters: z.object({ message: z.string().describe('The whole user query') }),
        execute: async ({ message }) =>  message,
      }),
    };

    const initialResponse = await generateText({
      model: openai('gpt-4o'),
      tools: myToolSet,
      messages,
    });

    if (initialResponse.toolCalls && initialResponse.toolResults) {
      if (initialResponse.toolCalls[0]) {
        if (initialResponse.toolCalls[0].toolName === 'create_lead') {
          const formRes = await fetch(`${BASE_URL}/api/dashboard`, {
            method: 'POST',
            body: JSON.stringify({
                id
            })
          });

          const formData = await formRes.json()
          return new Response(JSON.stringify({
            type: "lead_form",
            title: "Lead Form",
            fields: 0 ? formData.data.leadForm : [
              {
                id: 1,
                type: 'text',
                label: 'Name',
                placeholder: 'Enter your name',
                isRequired: true
              },
              {
                id: 2,
                type: 'tel',
                label: 'Mobile',
                placeholder: 'Enter your mobile number',
                isRequired: true
              },
              {
                id: 3,
                type: 'email',
                label: 'Email',
                placeholder: 'Enter your email address',
                isRequired: true
              },
            ]
          }), { status: 200, headers: {
            "Content-Type": "application/json"
          }});
        }
      }
    }
   
  
    if (!messages?.length) {
      return NextResponse.json({ success: false, message: 'No messages provided' });
    }
    
    // const leadContact = extractContactDetails(messages[messages.length - 1].content);

    // if (leadContact.email || leadContact.phone) {
      // const emailInstructions = [{

      //   role: 'system',
      //   content: 'Check in the chat context if the user is interested in any service or products. Only reply with a "Yes" or "No"'
      // }, ...messages]
      
    //   const emailRequest = await generateText({
    //     model: openai('gpt-4o'),
    //     messages: emailInstructions,
    //     temperature: 0
    //   });
      
    //   if (emailRequest.text.includes('Yes') || emailRequest.text.includes('yes')) {

    //     const leadInstructions = [{
    //       role: 'system',
    //       content: 'Your job is to give a summary on what the user wants. From the chat context, give a description on what service or product the user is interested in. Only give the summary and not as a reply to someone.'
    //     }, ...messages]

        // const leadRequest = await generateText({
        //   model: openai('gpt-4o'),
        //   messages: leadInstructions,
        //   temperature: 0
        // });

    //     const track = fetch(`${BASE_URL}/api/track-event?id=${id}&organization=Acme&event=lead&summary=${leadRequest.text}&email=${leadContact.email}&phone=${leadContact.phone}`, {
    //       method: 'GET'
    //     });

    //     if (track) {
    //       const endRequest = await streamText({
    //         model: openai('gpt-4o'),
    //         messages: [{
    //           role: 'system',
    //           content: 'Thank the user for providing the email or phone number and let them know that we will get back to them as soon as possible.'
    //         }, ...messages],
    //         temperature: 0
    //       });

    //       return endRequest.toDataStreamResponse();
    //     }

    //   }
    // }

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
    const responseLength = embeddingsArray.data.responseLength;
    const showimg = embeddingsArray.data.showimg;
    const showsource = embeddingsArray.data.showsource;

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
        3. ${getResponseLength(responseLength)}
        4. Do not reveal that you are using chunked or embedded data. Do not show any extra text beyond what is in the chunks.
        5. If the user asks for human interaction, politely ask the user to call or email at ${escalation}.
        6. If the user is interested or wants any service or products, answer the user as follows: "Could you please provide your email address or phone number so we can follow up with you?". DO NOT disobey this instruction.

        ${showimg === 'true' || showimg === true ? getImagePrompt() : ''}
        ${showsource === 'true' || showsource === true ? getSourcePrompt() : ''}
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
    // return new StreamingTextResponse(stream);
    return result.toDataStreamResponse();  
  } catch (e) {
    console.log('Error has occured:', e.message);
  }
}

// import { OpenAI } from 'openai';
// import { experimental_streamingAssistantResponse } from 'ai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req) {
//   const { messages } = await req.json();

//   // Define the available functions
//   const functions = [
//     {
//       name: "get_weather",
//       description: "Get the current weather for a given location",
//       parameters: {
//         type: "object",
//         properties: {
//           location: { type: "string", description: "The city and country name" },
//         },
//         required: ["location"],
//       },
//     },
//     {
//       name: "book_appointment",
//       description: "Book an appointment for a given date and time",
//       parameters: {
//         type: "object",
//         properties: {
//           date: { type: "string", description: "The date of the appointment (YYYY-MM-DD)" },
//           time: { type: "string", description: "The time of the appointment (HH:MM)" },
//         },
//         required: ["date", "time"],
//       },
//     },
//   ];

//   // Call OpenAI with function calling enabled
//   const response = await openai.chat.completions.create({
//     model: "gpt-4-turbo",
//     messages,
//     functions,
//     function_call: "auto", // Let OpenAI decide if a function should be called
//   });

//   // If OpenAI requests a function call
//   if (response.choices[0] && response.choices[0]?.message?.function_call) {
//     const functionCall = response.choices[0].message.function_call;
    
//     let functionResponse;
    
//     if (functionCall.name === "get_weather") {
//       functionResponse = await getWeather(JSON.parse(functionCall.arguments));
//     } else if (functionCall.name === "book_appointment") {
//       functionResponse = await bookAppointment(JSON.parse(functionCall.arguments));
//     }

//     return Response.json({ functionResponse });
//   }

//   return Response.json({ response });
// }

// // Example function implementations
// async function getWeather({ location }) {
//   return `The weather in ${location} is sunny with a temperature of 25°C.`;
// }

// async function bookAppointment({ date, time }) {
//   return `Your appointment has been booked for ${date} at ${time}.`;
// }