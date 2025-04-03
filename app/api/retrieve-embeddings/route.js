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
    const link_knowledge = await db.collection('knowledge_base').find().toArray() ?? [];
    const document_knowledge = await db.collection('documents').find().toArray();
    let formatted_doc_knowledge = [];
    document_knowledge.forEach(element => {
        formatted_doc_knowledge = [...formatted_doc_knowledge, ...element.kb];
    });

    let formatted_links_knowledge = [];
    link_knowledge.forEach(element => {
        formatted_links_knowledge = [...formatted_links_knowledge, ...element.embeddings];
    });

    const settings = await db.collection('settings').findOne()
    let embeddingsArray = [];
    if (formatted_links_knowledge.length > 0) {
        embeddingsArray = [...formatted_links_knowledge]
    }
    if (formatted_doc_knowledge.length > 0) {
        embeddingsArray = [...embeddingsArray, ...formatted_doc_knowledge]
    }

    return NextResponse.json({ success: true, data: { embeddingsArray, organization, botName: settings.botName, tone: settings.tone, escalation: settings.escalation, responseLength: settings.responselength, showsource: settings.showsource, showimg: settings.showimg } });
}