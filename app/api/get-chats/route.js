import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
    const request = await req.json();

    const client = await clientPromise;
    const DB_NAME = getDbName(request.organization);
    const db = client.db(DB_NAME);

    try {
        const data = await db.collection('chats').find().toArray();
        if (data.length > 0) {
            const responseData = data.map(item => {
                return { id: item._id.toString(), ip: item.ip, country: item.country, flag: item.flag, messages: item.messages }
            })
            return NextResponse.json({ success: true, data: responseData });
        } else {
            return NextResponse.json({ success: true });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
