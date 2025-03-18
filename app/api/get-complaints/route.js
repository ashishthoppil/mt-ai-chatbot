import clientPromise from '@/lib/mongodb';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { getDbName } from '@/lib/utils';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const organization = searchParams.get('organization');

    const mongoClient = await clientPromise
    const DB_NAME = getDbName(organization);
    const db = mongoClient.db(DB_NAME)
    const queryCursor = await db.collection('chats').find({ "queryType": 'Complaint' });
    
    const queryDocs = await queryCursor.toArray();

    let complaints = []
    
    for (let i = 0; i < queryDocs.length; i++) {
        complaints = [...complaints, ...queryDocs[i].messages]
    }

    if (complaints.length) {

        const systemMessage = [{
            role: 'system',
            content: `You are a helpful assistant. Your job is to summarize the user's queries. Refer to the user role as 'visitors'.`
        }];
        
        const summary = await generateText({
            model: openai('gpt-4o-mini'), // or however your model is specified
            messages: [...complaints, ...systemMessage],
            temperature: 0
        });

        return NextResponse.json({ success: true, data: { summary: summary.text, count: queryDocs.length } });
    }
    return NextResponse.json({ success: false, data: 'There seems to be something wrong.' });
}