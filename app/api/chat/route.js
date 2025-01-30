import { openai } from '@ai-sdk/openai';
import { generateObject, streamText } from 'ai';

export const runtime = 'edge'

export async function POST(request) {
  const response = await request.json();
  let { messages } = response;
  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages,
  });
  return result.toDataStreamResponse();  
}