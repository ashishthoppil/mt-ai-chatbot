import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const client = await clientPromise;
  const db = client.db('kulfi'); // Replace with your database name

  
  const data = await req.json();
      // try {
      //   const posts = await db.collection('clients').find({}).toArray();
      //   res.status(200).json({ success: true, data: posts });
      // } catch (error) {
      //   res.status(500).json({ success: false, message: error.message });
      // }

      try {
        const result = await db.collection('clients').insertOne(data);
        return NextResponse.json({ success: true, data: result.ops[0] });
      } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
      }
}
