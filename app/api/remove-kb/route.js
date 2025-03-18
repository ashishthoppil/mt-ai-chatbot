import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    const request = await req.json();

    const client = await clientPromise;
    const DB_NAME = getDbName(request.organization);
    const db = client.db(DB_NAME);

    try {
        const data = await db.collection('documents').deleteOne({ _id: new ObjectId(request.id) });
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
