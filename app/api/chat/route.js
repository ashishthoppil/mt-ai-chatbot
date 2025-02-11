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
  const clientDoc = await db.collection('clients').findOne({ _id: new ObjectId('67ab337d739e450095424ad7') })
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
    content: `You are a helpful assistant. You have the following context: 
          ${topChunks.join('\n---\n')}
          Answer any questions using only the information above. If you are not sure, say so.`
  }, ...messages];

  // const instructions = [{
  //   role: 'system',
  //   content: `You are a helpful assistant called Kulfi AI.`
  // }, ...messages];

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages: instructions,
  });

  return result.toDataStreamResponse();  
}