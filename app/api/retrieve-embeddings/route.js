import clientPromise from '@/lib/mongodb';
import { getDbName } from '@/lib/utils';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const organization = searchParams.get('organization');

    const mongoClient = await clientPromise
    const DB_NAME = getDbName(organization);
    const db = mongoClient.db(DB_NAME)
    const knowledge = await db.collection('knowledge_base').findOne()
    const settings = await db.collection('settings').findOne()
    const embeddingsArray = knowledge?.embeddings || []
    // const embeddingsArray = clientDoc?.kb || []
    return NextResponse.json({ success: true, data: { embeddingsArray, organization, botName: settings.botName, tone: settings.tone, escalation: settings.escalation, responseLength: settings.responselength, showsource: settings.showsource, showimg: settings.showimg } });
}