import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();

  const plans = [
    // {
    //   name: 'Kulfi AI - Basic Monthly',
    //   count: 500,
    //   fileLimit: 1,
    //   fileSizeLimit: 25,
    //   linkLimit: 10
    // }, 
    // {
    //   name: 'Kulfi AI - Pro Monthly',
    //   count: 2500,
    //   fileLimit: 2,
    //   fileSizeLimit: 50,
    //   linkLimit: 30
    // },
    // {
    //   name: 'Kulfi AI - Growth Monthly',
    //   count: 7500,
    //   fileLimit: 5,
    //   fileSizeLimit: 100,
    //   linkLimit: 100
    // },
    // {
    //   name: 'Kulfi AI - Advanced Monthly',
    //   count: 999999999999999,
    //   fileLimit: 10,
    //   fileSizeLimit: 250,
    //   linkLimit: 500
    // },
    // {
    //   name: 'Kulfi AI - Basic Yearly',
    //   count: 500,
    //   fileLimit: 1,
    //   fileSizeLimit: 25,
    //   linkLimit: 10
    // }, 
    // {
    //   name: 'Kulfi AI - Pro Yearly',
    //   count: 2500,
    //   fileLimit: 2,
    //   fileSizeLimit: 50,
    //   linkLimit: 30
    // },
    // {
    //   name: 'Kulfi AI - Growth Yearly',
    //   count: 7500,
    //   fileLimit: 5,
    //   fileSizeLimit: 100,
    //   linkLimit: 100
    // },
    // {
    //   name: 'Kulfi AI - Advanced Yearly',
    //   count: 999999999999999,
    //   fileLimit: 10,
    //   fileSizeLimit: 250,
    //   linkLimit: 500
    // },
    {
      name: 'Kulfi AI - Basic',
      count: 500,
      fileLimit: 1,
      fileSizeLimit: 25,
      linkLimit: 10
    }, 
    {
      name: 'Kulfi AI - Pro',
      count: 1000,
      fileLimit: 2,
      fileSizeLimit: 50,
      linkLimit: 30
    },
    {
      name: 'Kulfi AI - Growth',
      count: 2500,
      fileLimit: 5,
      fileSizeLimit: 100,
      linkLimit: 100
    },
    {
      name: 'Kulfi AI - Advanced',
      count: 5000,
      fileLimit: 10,
      fileSizeLimit: 250,
      linkLimit: 500
    },
    {
      name: 'Kulfi AI - Starter (One Time)',
      count: 500,
      fileLimit: 10,
      fileSizeLimit: 250,
      linkLimit: 25
    },
    {
      name: 'Kulfi AI - Pro (One Time)',
      count: 2000,
      fileLimit: 100,
      fileSizeLimit: 99999,
      linkLimit: 50
    },
    
  ];

  const addons = [
    {
      name: '500 Additional Chats',
      count: 500,
    },
    {
      name: 'Increase URLs Limit by 50',
      count: 50,
    },
    {
      name: 'Kulfi  AI - Remove Branding',
      count: 0,
    },
    {
      name: 'Support & Maintenance',
      count: 0,
    },
  ]

  if (payload.meta.event_name === "order_created") {
    const organization = payload.meta.custom_data.organization;
    const DB_NAME = getDbName(organization);
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const selectedPlan = plans.filter((item) => item.name === payload.data.attributes.first_order_item.product_name)
    const selectedAddon = addons.filter((item) => item.name === payload.data.attributes.first_order_item.product_name)

    if (selectedPlan.length > 0) {
      const result = await db.collection('account').updateOne(
          {},
          {
            $set: { 
              subscriptionId: payload.data.id,
              subscriptionName: payload.data.attributes.first_order_item.product_name,
              isSubscribed: true,
              chatCount: selectedPlan.length > 0 ? selectedPlan[0].count : 0,
              fileLimit: selectedPlan.length > 0 ? selectedPlan[0].fileLimit : 0,
              fileSizeLimit: selectedPlan.length > 0 ? selectedPlan[0].fileSizeLimit : 0,
              linkLimit: selectedPlan.length > 0 ? selectedPlan[0].linkLimit : 0,
              subscribed_at: new Date(payload.data.attributes.created_at),
              brandingRemoved : selectedPlan[0].name === 'Kulfi AI - Pro (One Time)',
              freeTrialEnd: null,
              isServiced: false,
              support: false
            },
            $currentDate: { lastModified: true }
          }
      );
    } else if (selectedAddon.length > 0) {
      if (selectedAddon[0].name === '500 Additional Chats') {
        const account = await db.collection('account').find().toArray();
        const prevCount = account[0].chatCount;
        const result = await db.collection('account').updateOne(
          {},
          {
            $set: { 
              chatCount: prevCount + 500,
            },
            $currentDate: { lastModified: true }
          }
      );

      } else if (selectedAddon[0].name === 'Increase URLs Limit by 50') {
        const account = await db.collection('account').find().toArray();
        const prevCount = account[0].linkLimit;
        const result = await db.collection('account').updateOne(
          {},
          {
            $set: { 
              linkLimit: prevCount + 50,
            },
            $currentDate: { lastModified: true }
          }
        );
      } else if (selectedAddon[0].name === 'Kulfi  AI - Remove Branding') {
        const result = await db.collection('account').updateOne(
          {},
          {
            $set: { 
              brandingRemoved : selectedPlan[0].name === 'Kulfi AI - Advanced',
            },
            $currentDate: { lastModified: true }
          }
        );
      } else if (selectedAddon[0].name === 'Support & Maintenance') {
        const result = await db.collection('account').updateOne(
          {},
          {
            $set: { 
              isServiced : true,
            },
            $currentDate: { lastModified: true }
          }
        );
        
      }
    }

  }
  return NextResponse.json({ success: true, message: 'Payment confirmed' });
}