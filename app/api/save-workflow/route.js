import { getAnalyticsDb } from "@/lib/analytics";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const bcrypt = require('bcrypt');

export async function POST(req, res) {
  const DB_NAME = process.env.DB_NAME
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const data = await req.json();

  try {
      const formattedData = { ...data.workflow, tenantId: data.id }
      const result = await db.collection('workflows').insertOne(formattedData);
    
      if (result.acknowledged) {
        return NextResponse.json({ success: true, data: result });
      }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
