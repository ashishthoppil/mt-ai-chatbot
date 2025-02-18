import clientPromise from '@/lib/mongodb';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const mongoClient = await clientPromise
    const db = mongoClient.db('kulfi')
    const queryCursor = await db.collection('queries').find({ "id": id, "queryType": 'Complaint' });
    
    const queryDocs = await queryCursor.toArray();

    let complaints = ''
    console.log('queryDocsqueryDocs', queryDocs);
    
    for (let i = 0; i < queryDocs.length; i++) {
        complaints += `${queryDocs[i].query} `
    }

    if (complaints) {

        const systemMessage = [{
            role: 'system',
            content: `You are a helpful assistant. Your job is to summarize the following text: ${complaints}.`
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