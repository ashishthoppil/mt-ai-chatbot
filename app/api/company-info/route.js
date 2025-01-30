import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const client = await clientPromise;
  const db = client.db('kulfi');
  const ZAPIER_WEBHOOK = process.env.ZAPIER_WEBHOOK;
  const data = await req.json();

  try {
    const result = await db.collection('clients').insertOne(data);
    if (result.acknowledged) {
      const zapierRes = await fetch(ZAPIER_WEBHOOK, {
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
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
