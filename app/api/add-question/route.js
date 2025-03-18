import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();

    const client = await clientPromise;
    const DB_NAME = getDbName(body.organization);
    const db = client.db(DB_NAME);

    try {
        const result = await db.collection('faqs').insertOne({
            question: body.question,
            answer: body.answer
        });
        return NextResponse.json({ success: true, message: result });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
