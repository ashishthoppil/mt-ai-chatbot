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
        const result = await db.collection('settings').updateOne(
            {},
            {
              $set: { 
                botName: request.botName, 
                color: request.color, 
                cw: request.cw, 
                tone: request.tone, 
                escalation: request.escalation, 
                botIcon: request.botIcon, 
                hideBranding: request.hideBranding, 
                botAvatar: request.botAvatar, 
                alignment: request.alignment,
                initialmsg: request.initialmsg,
                placeholder: request.placeholder,
                responselength: request.responselength,
                showsource: request.showsource,
                showimg: request.showimg
              },
              $currentDate: { lastModified: true }
            }
        );
        return NextResponse.json({ success: true, message: result });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}