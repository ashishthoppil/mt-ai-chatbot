import clientPromise from '@/lib/mongodb';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const mongoClient = await clientPromise
    const db = mongoClient.db('kulfi')
    const queryCursor = await db.collection('queries').find({ "id": id, "queryType": 'General query' });
    
    const queryDocs = await queryCursor.toArray();

    let generalQueries = ''
    
    for (let i = 0; i < queryDocs.length; i++) {
        generalQueries += `${queryDocs[i].query} `
    }
    if (generalQueries) {
        const systemMessage = [{
            role: 'system',
            content: `You are a helpful assistant. Your job is to summarize the following text: ${generalQueries}. Never just show the text provided to you.`
        }];
        
        const summary = await generateText({
            model: openai('gpt-4o-mini'), // or however your model is specified
            messages: systemMessage,
            temperature: 0
        });
        return NextResponse.json({ success: true, data: { summary: summary.text, count: queryDocs.length } });
    }
    return NextResponse.json({ success: false, data: 'There seems to be something wrong.' });
}