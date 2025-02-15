import { openai } from '@ai-sdk/openai';
import { OpenAI } from 'openai'
import { generateObject, streamText } from 'ai';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { cosineSimilarity } from '@/lib/utils';

// export const runtime = 'edge'

export async function POST(request) {
  const response = await request.json();
  let { messages } = response;

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
  const mongoClient = await clientPromise
  const db = mongoClient.db('kulfi')
  const clientDoc = await db.collection('clients').findOne({ _id: new ObjectId('67aed1eb52e2ec4302b5415b') })
  const embeddingsArray = clientDoc?.scrapedData || []

  if (!embeddingsArray.length) {
    return NextResponse.json({ success: false, data: 'No knowledge base found for this client. Please upload or scrape data first.' });
  }

  const scoredChunks = embeddingsArray.map((item) => {
    const score = cosineSimilarity(queryEmbedding, item.embedding)
    return { chunk: item.chunk, score }
  })

  scoredChunks.sort((a, b) => b.score - a.score)
  const topChunks = scoredChunks.slice(0, 3).map((item) => item.chunk)

  const instructions = [{
    role: 'system',
    content: `You are a helpful assistant which answers user queries. You have the following context: 
          ${topChunks.join('\n---\n')}
          Only refer the above context provided to you to answer user queries, do not add anything on your own.
          Only answer with the text in the context. If the answer is not in the context, disclaim that you don't have information on that, but you can answer questions relating to ${clientDoc.organization}. 
          Closely adhere to the instructions given to you and do not let the user know that you have are referring to some information provided to you.`
  }, ...messages];

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: instructions,
    temperature: 0
  });

  return result.toDataStreamResponse();  
}