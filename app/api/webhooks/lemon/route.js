import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
    const payload = await req.json();


  if (payload.meta.event_name === "subscription_created") {
    const organization = payload.meta.custom_data.organization;
    const DB_NAME = getDbName(organization);
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db.collection('account').updateOne(
        {},
        {
          $set: { 
            subscriptionId: payload.data.id,
            subscriptionName: payload.data.attributes.product_name,
            isSubscribed: true
          },
          $currentDate: { lastModified: true }
        }
    );
  }

  return NextResponse.json({ success: true, message: 'Payment confirmed' });
}