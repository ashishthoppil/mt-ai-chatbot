import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = await clientPromise;
  const DB_NAME = process.env.DB_NAME;
  const db = client.db(DB_NAME);

  const request = await req.json();
    try {
        const result = await db.collection('clients').updateOne(
            { _id: new ObjectId(request.id) },
            {
              $set: { botName: request.botName, color: request.color, cw: request.cw, tone: request.tone, escalation: request.escalation },
              $currentDate: { lastModified: true }
            }
        );
        return NextResponse.json({ success: true, message: result });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}