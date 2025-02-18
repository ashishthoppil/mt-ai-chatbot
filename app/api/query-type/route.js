import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const bcrypt = require('bcrypt');

export async function POST(req) {
  const DB_NAME = process.env.DB_NAME
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const data = await req.json();

  try {
      const result = await db.collection('queries').insertOne(data);
      return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
