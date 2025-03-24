import { PLANS } from "@/lib/constants";
import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse } from "next/server";

const bcrypt = require('bcrypt');

export async function POST(req, res) {
  const data = await req.json();

  const DB_NAME = getDbName(data.organization);
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  try {
      const account = await db.collection('account').find().toArray();
      let limit;
      if (PLANS.BASIC.includes(account[0].subscriptionName)) {
        limit = 3;
      } else if (PLANS.PRO.includes(account[0].subscriptionName)) {
        limit = 5;
      } else if (PLANS.PRO.includes(account[0].subscriptionName)) {
        limit = 10;
      } else if (PLANS.PRO.includes(account[0].subscriptionName)) {
        limit = null;
      }

      const count = await db.collection('workflows').count();

      if (limit && count >= limit) {
        return NextResponse.json({ success: false, message: 'Custom responses limit reached. Upgrade the plan for more responses.' });
      }
      const formattedData = { ...data.workflow }
      const result = await db.collection('workflows').insertOne(formattedData);
    
      if (result.acknowledged) {
        return NextResponse.json({ success: true, data: result });
      }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
