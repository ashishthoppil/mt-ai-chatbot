import { getAnalyticsDb } from "@/lib/helper";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const bcrypt = require('bcrypt');

export async function POST(req, res) {
  const DB_NAME = process.env.DB_NAME
  const ZAPIER_WEBHOOK = process.env.ZAPIER_WEBHOOK;
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const data = await req.json();

  const salt = bcrypt.genSaltSync(10);
  const hashedpass = bcrypt.hashSync(data.password, salt);
  try {
      const formattedData = { ...data, password: hashedpass, cw: '400', tone: 'formal', escalation: '' }
      const result = await db.collection('clients').insertOne(formattedData);
    
      if (result.acknowledged) {

        const collection = await db.createCollection(`${getAnalyticsDb(data.organization, result.insertedId.toString())}}`);
        if (collection) {
          await fetch(ZAPIER_WEBHOOK, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: result.insertedId.toString(),
              email: data.email,
            }),
          });
        }
      }

      return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
