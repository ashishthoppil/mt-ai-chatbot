import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
    const request = await req.json();
    const organization = request.organization;
    const DB_NAME = getDbName(organization);
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const account = await db.collection('account').find().toArray();

    const lemon = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${account[0].subscriptionId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${process.env.LEMON_PRIVATE_KEY}`
        }
    });

    const payload = await lemon.json()
    const result = await db.collection('account').updateOne(
        {},
        {
          $set: {
            isSubscribed: !(payload.data.attributes.status === 'cancelled' && payload.data.attributes.cancelled === true),
          },
          $currentDate: { lastModified: true }
        }
    );

  return NextResponse.json({ success: true, message: 'Subscription cancelled' });
}