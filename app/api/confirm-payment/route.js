import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
    const payload = await req.json();

    const DB_NAME = getDbName('Lumiscent India');
    const client = await clientPromise;
    const db = client.db(DB_NAME);

  if (payload.event_name === "subscription_created") {
    const result = await db.collection('settings').updateOne(
        {},
        {
          $set: { 
            isSubscribed: true
          },
          $currentDate: { lastModified: true }
        }
    );
  }

  return NextResponse.json({ success: true });
}