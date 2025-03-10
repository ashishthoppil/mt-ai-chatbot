import clientPromise from '@/lib/mongodb';
import { generateObject, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

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
            content: `You are a helpful assistant. Summarize the following text and extract the 5 most queried topics and their occurences (most to least order): ${generalQueries}. 
                Return an object in the following format:
                    {
                        summary: 'Concise summary of the text',
                        hotTopics: [
                            {
                                name: 'Topic1',
                                occurrence: 40,
                            },
                            {
                                name: 'Topic2',
                                occurrence: 25,
                            },
                            {
                                name: 'Topic3',
                                occurrence: 10,
                            },
                        ]
                    }
                Never just return the text provided to you.`,
        }];

        const hotTopicsSchema = z.object({
            name: z.string(),
            occurrence: z.number()
        })
        
        const summary = await generateObject({
            model: openai('gpt-4o-mini'),
            messages: systemMessage,
            temperature: 0,
            schema: z.object({
                summary: z.string(),
                hotTopics: z.array(hotTopicsSchema)
            }),
        });

        console.log('summarysummarysummary123', summary.object.hotTopics);
        return NextResponse.json({ success: true, data: { summary: summary.object.summary, count: queryDocs.length, graphData: summary.object.hotTopics } });
    }
    return NextResponse.json({ success: false, data: 'There seems to be something wrong.' });
}