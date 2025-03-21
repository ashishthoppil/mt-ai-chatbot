import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const request = await req.json();
    const client = await clientPromise;
    const DB_NAME = getDbName(request.organization);
    const db = client.db(DB_NAME);

    try {
        const cookieStore = await cookies()
        console.log('cookieStorecookieStore', cookieStore.getAll())
        const account = await db.collection('account').find().toArray();
        const settings = await db.collection('settings').find().toArray();
        const links = await db.collection('links').find().toArray();
        const documents = await db.collection('documents').find().toArray();
        console.log('documentsdocuments', documents)
        const fileNames = documents.map((item) => {
            return {
                id: item._id.toString(),
                fileName: item.fileName
            }
        })

        if (account.length > 0 && settings.length) {
            return NextResponse.json({ success: true, data: { ...account[0], ...settings[0] }, links: links[0].links, fileNames });
        } 
        return NextResponse.json({ success: false, message: 'Something went wrong!' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
