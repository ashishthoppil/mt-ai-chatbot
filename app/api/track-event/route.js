import { getAnalyticsDb } from "@/lib/helper";
import clientPromise from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

const bcrypt = require('bcrypt');

export async function POST(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    return res.status(200).end();
  }
  const DB_NAME = process.env.DB_NAME
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const { id, organization, event } = await req.json();

  try {
    const result = await db.collection(getAnalyticsDb(organization, id)).insertOne({
      event,
      time: new Date()
    });

    if (result.acknowledged) {
      return NextResponse.json({ success: true, data: result });
    }
    return NextResponse.json({ success: false, message: 'Something went wrong!' });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
