import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = await clientPromise;
  const DB_NAME = process.env.DB_NAME;
  const db = client.db(DB_NAME);

  const request = await req.json();
    try {
        const result = await db.collection('faqs').insertOne(request);
        return NextResponse.json({ success: true, message: result });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
