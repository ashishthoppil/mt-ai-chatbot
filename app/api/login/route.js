import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const bcrypt = require('bcrypt');

export async function POST(req, res) {
  const client = await clientPromise;
  const DB_NAME = process.env.DB_NAME;
  const db = client.db(DB_NAME);

  const data = await req.json();
      try {
        const exists = await db.collection('clients').find({ email: data.email }).toArray();
        if (exists.length > 0) {
            const hasedPass = exists[0].password;
            const match = await bcrypt.compareSync(data.password, hasedPass);
            if (match) {
                return NextResponse.json({ success: true, message: exists[0] });
            } else {
                return NextResponse.json({ success: true, message: 'Wrong Password!' });
            }
        }
        return NextResponse.json({ success: true, message: 'No such email address in our records!' });
      } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
      }
}
