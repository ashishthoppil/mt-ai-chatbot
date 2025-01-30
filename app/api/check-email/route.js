import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const client = await clientPromise;
  const db = client.db('kulfi'); // Replace with your database name

  const data = await req.json();
      try {
        const exists = await db.collection('clients').find({ email: data.email }).toArray();
        return NextResponse.json({ success: true, data: exists });
      } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
      }
}
