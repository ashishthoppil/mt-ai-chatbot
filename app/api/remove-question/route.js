import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    const client = await clientPromise;
    const DB_NAME = process.env.DB_NAME;
    const db = client.db(DB_NAME);
    const request = await req.json();

    try {
        const data = await db.collection('faqs').deleteOne({ _id: new ObjectId(request.faqId) });
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
