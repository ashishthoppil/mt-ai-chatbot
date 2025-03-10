import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const mongoClient = await clientPromise
    const db = mongoClient.db('kulfi')
    const clientDoc = await db.collection('clients').findOne({ _id: new ObjectId(id) })
    const embeddingsArray = clientDoc?.scrapedData || []
    // const embeddingsArray = clientDoc?.kb || []
    return NextResponse.json({ success: true, data: { embeddingsArray, organization: clientDoc.organization, botName: clientDoc.botName, tone: clientDoc.tone, escalation: clientDoc.escalation, responseLength: clientDoc.responselength, showsource: clientDoc.showsource, showimg: clientDoc.showimg } });
}