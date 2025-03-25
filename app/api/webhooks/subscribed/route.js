import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();

  const plans = [
    {
      name: 'Kulfi AI - Basic Monthly',
      count: 500,
      fileLimit: 1,
      fileSizeLimit: 25,
      linkLimit: 10
    }, 
    {
      name: 'Kulfi AI - Pro Monthly',
      count: 2500,
      fileLimit: 2,
      fileSizeLimit: 50,
      linkLimit: 30
    },
    {
      name: 'Kulfi AI - Growth Monthly',
      count: 7500,
      fileLimit: 5,
      fileSizeLimit: 100,
      linkLimit: 100
    },
    {
      name: 'Kulfi AI - Advanced Monthly',
      count: 999999999999999,
      fileLimit: 10,
      fileSizeLimit: 250,
      linkLimit: 500
    },
    {
      name: 'Kulfi AI - Basic Yearly',
      count: 500,
      fileLimit: 1,
      fileSizeLimit: 25,
      linkLimit: 10
    }, 
    {
      name: 'Kulfi AI - Pro Yearly',
      count: 2500,
      fileLimit: 2,
      fileSizeLimit: 50,
      linkLimit: 30
    },
    {
      name: 'Kulfi AI - Growth Yearly',
      count: 7500,
      fileLimit: 5,
      fileSizeLimit: 100,
      linkLimit: 100
    },
    {
      name: 'Kulfi AI - Advanced Yearly',
      count: 999999999999999,
      fileLimit: 10,
      fileSizeLimit: 250,
      linkLimit: 500
    },
    {
      name: 'Kulfi AI - Basic',
      count: 500,
      fileLimit: 1,
      fileSizeLimit: 25,
      linkLimit: 10
    }, 
    {
      name: 'Kulfi AI - Pro',
      count: 2500,
      fileLimit: 2,
      fileSizeLimit: 50,
      linkLimit: 30
    },
    {
      name: 'Kulfi AI - Growth',
      count: 7500,
      fileLimit: 5,
      fileSizeLimit: 100,
      linkLimit: 100
    },
    {
      name: 'Kulfi AI - Advanced',
      count: 999999999999999,
      fileLimit: 10,
      fileSizeLimit: 250,
      linkLimit: 500
    },
  ];

  if (payload.meta.event_name === "subscription_created") {
    const organization = payload.meta.custom_data.organization;
    const DB_NAME = getDbName(organization);
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const selectedPlan = plans.filter((item) => item.name === payload.data.attributes.product_name)

    const result = await db.collection('account').updateOne(
        {},
        {
          $set: { 
            subscriptionId: payload.data.id,
            subscriptionName: payload.data.attributes.product_name,
            isSubscribed: payload.data.attributes.status === 'active',
            chatCount: selectedPlan.length > 0 ? selectedPlan[0].count : 0,
            fileLimit: selectedPlan.length > 0 ? selectedPlan[0].fileLimit : 0,
            fileSizeLimit: selectedPlan.length > 0 ? selectedPlan[0].fileSizeLimit : 0,
            linkLimit: selectedPlan.length > 0 ? selectedPlan[0].linkLimit : 0,
            renews_at: new Date(payload.data.attributes.renews_at),
            subscribed_at: new Date(payload.data.attributes.created_at),
            freeTrialEnd: null
          },
          $currentDate: { lastModified: true }
        }
    );

  }
  return NextResponse.json({ success: true, message: 'Payment confirmed' });
}