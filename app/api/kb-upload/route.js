import { chunkText } from "@/lib/chunkText";
import clientPromise from "@/lib/mongodb";
import pdfParse from 'pdf-parse'
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ObjectId } from "mongodb";

export const config = {
    api: {
      bodyParser: false,
    },
    runtime: 'nodejs'
}

export async function POST(req) {
    const client = await clientPromise;
    const DB_NAME = process.env.DB_NAME;
    const db = client.db(DB_NAME);
    
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const formData = await req.formData()
        const file = formData.get('file');
        const id = formData.get('id');
    
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const data = await pdfParse(buffer)
        const text = data.text
    
        const chunks = chunkText(text, 10000);
    
        if (chunks.length > 0) {
                const embeddings = [];
                for (let i = 0; i < chunks.length; i++) {
                    const chunk = chunks[i];
                    const embeddingRes = await openai.embeddings.create({
                        model: 'text-embedding-ada-002',
                        input: chunk,
                    })
            
                    if (embeddingRes) {
                        const [{ embedding }] = embeddingRes.data
                        embeddings.push({
                            chunk,
                            embedding,
                        });  
                    }
                }
    
                if (embeddings.length > 0) {
                    const result = await db.collection('clients').updateOne(
                        { _id: new ObjectId(id) },
                        {
                            $set: { fileName: file.name, kb: embeddings },
                            $currentDate: { lastModified: true }
                        }
                    );
                    return NextResponse.json({ success: true, message: result });
                }
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }

}