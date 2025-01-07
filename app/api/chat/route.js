import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(request) {
  let { messages } = await request.json();

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages,
  });
  return result.toDataStreamResponse();  
}