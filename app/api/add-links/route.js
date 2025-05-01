import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
    const request = await req.json();

    const client = await clientPromise;
    const DB_NAME = getDbName(request.organization);
    const db = client.db(DB_NAME);
   
    try {
        const deletion = await db.collection('knowledge_base').drop();
        const linksDeletion = await db.collection('links').drop();
        const sanitizedLinks = []
        if (request.links.length > 0) {
            request.links.forEach(item => {
                if (item) {
                  sanitizedLinks.push({
                      link: item,
                      status: 'not-started'
                  })
                }
              });
      
            const result = await db.collection('links').insertOne({ links: sanitizedLinks });
        }
       
        return NextResponse.json({ success: true, message: sanitizedLinks });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
