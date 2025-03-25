import { openai } from '@ai-sdk/openai';
import { OpenAI } from 'openai'
import { generateText, streamText, tool, jsonSchema, streamObject } from 'ai';
import { NextResponse } from 'next/server';
import { cosineSimilarity } from '@/lib/utils';
import { z } from 'zod';
import { PLANS } from '@/lib/constants';

export const runtime = 'edge'

const getResponseLength = (length) => {
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

const getBodyParams = (params) => {
  if (params) {
    const paramArr = params.split(',').map(item => item.trim());
    const resultant = {};
    paramArr.forEach(item => {
      resultant[item] = {
        type: 'string',
        description: `This is the ${item} in the user query`
      }
    })
  
    return jsonSchema({
      type: 'object',
      properties: resultant,
      required: paramArr
    });
  }
  return jsonSchema({
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'The whole user query',
      }
    },
    required: ['message']
  });
}

export async function POST(request) {
  try {
    const response = await request.json();
    let { id, messages, org, userId } = response;
    const BASE_URL = process.env.BASE_URL

    const dashboardResponse = await fetch(`${BASE_URL}/api/dashboard`, {
      method: 'POST',
      body: JSON.stringify({
          id,
          organization: org
      })
    });

    const dashboard = await dashboardResponse.json();

    if (dashboard.count >= dashboard.data.chatCount || !dashboard.data.isSubscribed) {
      const intentResult = await streamText({
        model: openai('gpt-4o-mini'),
        system: `You are a helpful assistant. You must strictly follow the given command without deviation. 
                DO NOT interpret, rephrase, or add additional information. Just execute the command exactly as stated.`,
        prompt: `Respond with: The chatbot is currently unavailable at the moment. Please try again after sometime.`,
        temperature: 0
      });

      return intentResult.toDataStreamResponse();
    }


    const res = await fetch(`${BASE_URL}/api/get-workflows`, {
      method: 'POST',
      body: JSON.stringify({
        organization: org
      })
    });
    const data = await res.json();
    let custom_workflows = {};

    if (data.data) {
      data.data.forEach(element => {
        custom_workflows = {
          ...custom_workflows,
          [element.title.toLowerCase().replace(/\s+/g, '_')]: tool({
            description: element.condition + `. Example: ${element.phrases}`,
            parameters: getBodyParams(element.parameters),
            execute: async (args) => {
              if (element.webhook) {
                const response = await fetch(element.webhook, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(args)
                });

                const data = response.json();

                if (data) {
                  return element.action
                }
              }
              return element.action
            }
          })
        }
      });
    }
    let myToolSet = { ...custom_workflows };

    if (!PLANS.BASIC.includes(dashboard.data.subscriptionName) && dashboard.data.leadForm.length && dashboard.data.leadSave) {
      myToolSet = { 
        ...myToolSet,
        create_lead: tool({
          description: 'When a user wants a service or a product. Use this tool only when something similar to these phrases is asked: ' + dashboard.data.leadPhrases,
          parameters: z.object({ service: z.string().describe('The service/product queried by user') }),
          execute: async ({ message }) =>  message,
        })
       }
    }

    const initialResponse = await generateText({
      model: openai('gpt-4-turbo'),
      tools: myToolSet,
      prompt: messages[messages.length - 1].content
      // messages
    });
    if (initialResponse.toolCalls && initialResponse.toolResults) {
      if (initialResponse.toolCalls[0]) {
        if (initialResponse.toolCalls[0].toolName === 'create_lead') {

          const intentResult = await streamText({
            model: openai('gpt-4o-mini'),
            system: `You are a helpful assistant. Just execute the command exactly as stated.`,
            prompt: `Respond with this as it is: ${JSON.stringify(dashboard.data.leadForm)}`,
            temperature: 0
          });

          return intentResult.toDataStreamResponse();
          // return new Response(JSON.stringify({
          //   type: "lead_form",
          //   title: "Lead Form",
          //   fields: dashboard.data.leadForm ? dashboard.data.leadForm : [
          //     {
          //       id: 1,
          //       type: 'text',
          //       label: 'Name',
          //       placeholder: 'Enter your name',
          //       isRequired: true
          //     },
          //     {
          //       id: 2,
          //       type: 'tel',
          //       label: 'Mobile',
          //       placeholder: 'Enter your mobile number',
          //       isRequired: true
          //     },
          //     {
          //       id: 3,
          //       type: 'email',
          //       label: 'Email',
          //       placeholder: 'Enter your email address',
          //       isRequired: true
          //     },
          //   ]
          // }), { status: 200, headers: {
          //   "Content-Type": "application/json"
          // }});
        } else {
          const intentResult = await streamText({
            model: openai('gpt-4o-mini'),
            system: `You are a helpful assistant. You must strictly follow the given command without deviation. 
                    DO NOT interpret, rephrase, or add additional information. Just execute the command exactly as stated.`,
            prompt: `DO NOT VIOLATE THIS COMMAND: ${initialResponse.toolResults[0].result}`,
            temperature: 0
          });

          return intentResult.toDataStreamResponse();
        }
      }
    }
   
  
    if (!messages?.length) {
      return NextResponse.json({ success: false, message: 'No messages provided' });
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
    const embeddingsRes = await fetch(`${BASE_URL}/api/retrieve-embeddings?id=${id}&organization=${org}`);
  
    const embeddingsArray = await embeddingsRes.json();
    const organization = embeddingsArray.data.organization;
    const tone = embeddingsArray.data.tone;
    const escalation = embeddingsArray.data.escalation;
    const botName = embeddingsArray.data.botName;
    const responseLength = embeddingsArray.data.responseLength;
    const showimg = embeddingsArray.data.showimg;
    const showsource = embeddingsArray.data.showsource;

    if (!embeddingsArray.data.embeddingsArray.length) {
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
        5. If the user asks for human interaction, or you are not able to resolve the user query, politely ask the user to call or email at ${escalation}.

        ${!PLANS.BASIC.includes(dashboard.data.subscriptionName) && (showimg === 'true' || showimg === true) ? getImagePrompt() : ''}
        ${showsource === 'true' || showsource === true ? getSourcePrompt() : ''}
      `
    }, ...messages];
  
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages: instructions,
      temperature: 0
    });

    let responseText = '';
    for await (const chunk of result.textStream) {
      responseText += chunk;
    }

    const querySaveResponse = await fetch(`${BASE_URL}/api/query-type`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userId,
        organization: org,
        messages: [...messages, { role: 'assistant', content: responseText }]
      }),
    });

    return result.toDataStreamResponse();  
  } catch (e) {
    console.log('Error has occured:', e.message);
  }
}