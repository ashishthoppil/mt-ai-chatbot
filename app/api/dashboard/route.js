import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const client = await clientPromise;
    const DB_NAME = process.env.DB_NAME;
    const db = client.db(DB_NAME);
    const request = await req.json();

    try {
        const data = await db.collection('clients').find({ _id: new ObjectId(request.id) }).toArray();
        if (data.length > 0) {
            return NextResponse.json({ success: true, data: data[0] });
        } else {
            return NextResponse.json({ success: true });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
