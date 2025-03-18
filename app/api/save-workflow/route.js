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
      const formattedData = { ...data.workflow }
      const result = await db.collection('workflows').insertOne(formattedData);
    
      if (result.acknowledged) {
        return NextResponse.json({ success: true, data: result });
      }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
