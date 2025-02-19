import { openai } from '@ai-sdk/openai';
import { OpenAI } from 'openai'
import { generateText, streamText } from 'ai';
import { NextResponse } from 'next/server';
import { cosineSimilarity } from '@/lib/utils';

export const runtime = 'edge'

export async function POST(request) {
  const response = await request.json();
  let { id, messages } = response;

  const BASE_URL = process.env.BASE_URL

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
  console.log('HereHereHereHereHere', id);
  const embeddingsRes = await fetch(`${BASE_URL}/api/retrieve-embeddings?id=${id}`);

  const embeddingsArray = await embeddingsRes.json();
  const organization = embeddingsArray.data.organization;
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
    content: `You are a helpful assistant called ${botName} who answers user queries. You have the following context: 
          ${topChunks.join('\n---\n')}
          Only refer the above context provided to you to answer user queries, do not add anything on your own.
          Only answer with the text in the context. If the answer is not in the context, disclaim that you don't have information on that, but you can answer questions relating to ${organization}. 
          Closely adhere to the instructions given to you and do not let the user know that you have are referring to some information provided to you.`
  }, ...messages];

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: instructions,
    temperature: 0
  });

  const systemMessage = {
    role: 'system',
    content: `You are a helpful assistant. Please classify the user query
              as 'Complaint', 'Feedback', or 'General query' only.`
  };

  const userMessage = {
    role: 'user',
    content: messages[messages.length - 1].content // or however you store it
  };

  const queryTypeInstructions = [systemMessage, userMessage];


  const queryTypeRes = await generateText({
    model: openai('gpt-4o-mini'), // or however your model is specified
    messages: queryTypeInstructions,
    temperature: 0
  });

  if (queryTypeRes.text && messages[messages.length - 1].content) {
    const saveQueryType = await fetch(`${BASE_URL}/api/query-type`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        queryType: queryTypeRes.text,
        query: messages[messages.length - 1].content
      }),
    });

    const saveQueryRes = await saveQueryType.json();
    console.log('info: ', saveQueryRes);
  }


  return result.toDataStreamResponse();  
}