import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
    const payload = await req.json();


  if (payload.meta.event_name === "subscription_created" || payload.meta.event_name ===  "subscription_payment_success") {
    const organization = payload.meta.custom_data.organization;
    const DB_NAME = getDbName(organization);
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const plans = [
      {
        name: 'Kulfi AI - Basic Monthly',
        count: 500,
      }, 
      {
        name: 'Kulfi AI - Pro Monthly',
        count: 2500,
      },
      {
        name: 'Kulfi AI - Growth Monthly',
        count: 7500,
      },
      {
        name: 'Kulfi AI - Advanced Monthly',
        count: 999999999999999,
      },
      {
        name: 'Kulfi AI - Basic Yearly',
        count: 500,
      }, 
      {
        name: 'Kulfi AI - Pro Yearly',
        count: 2500,
      },
      {
        name: 'Kulfi AI - Growth Yearly',
        count: 7500,
      },
      {
        name: 'Kulfi AI - Advanced Yearly',
        count: 999999999999999,
      },
      {
        name: 'Kulfi AI - Basic',
        count: 500,
      }, 
      {
        name: 'Kulfi AI - Pro',
        count: 2500,
      },
      {
        name: 'Kulfi AI - Growth',
        count: 7500,
      },
      {
        name: 'Kulfi AI - Advanced',
        count: 999999999999999,
      },
    ];

    const selectedPlan = plans.filter((item) => item.name === payload.data.attributes.product_name)

    const result = await db.collection('account').updateOne(
        {},
        {
          $set: { 
            subscriptionId: payload.data.id,
            subscriptionName: payload.data.attributes.product_name,
            isSubscribed: true,
            chatCount: selectedPlan.length > 0 ? selectedPlan[0].count : 0,
          },
          $currentDate: { lastModified: true }
        }
    );
  }

  return NextResponse.json({ success: true, message: 'Payment confirmed' });
}