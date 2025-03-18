import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = await clientPromise;
  const DB_NAME = 'clients';
  const db = client.db(DB_NAME);
  const data = await req.json();

  if (db) {
    try {
      const exists = await db.collection('emails').find({ email: data.email }).toArray();
      return NextResponse.json({ success: true, data: exists });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
  return NextResponse.json({ success: false, message: 'Something went wrong! please contact us at support@kulfi-ai.com to raise a ticket.' });
}
