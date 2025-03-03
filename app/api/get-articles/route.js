import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    const client = await clientPromise;
    const DB_NAME = process.env.DB_NAME;
    const db = client.db(DB_NAME);
    const request = await req.json();

    try {
        const data = await db.collection('articles').find({ id: request.id }).toArray();
        if (data.length > 0) {
            const responseData = data.map(item => {
                return { id: item._id.toString(), title: item.title, link: item.link, description: item.description, img: item.img }
            })
            return NextResponse.json({ success: true, data: responseData });
        } else {
            return NextResponse.json({ success: true });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
