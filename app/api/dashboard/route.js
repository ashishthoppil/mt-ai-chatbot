import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const client = await clientPromise;
    const db = client.db('kulfi');
    try {
        const data = await db.collection('clients').find({}).toArray();
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
