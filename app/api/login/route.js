import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const bcrypt = require('bcrypt');

export async function POST(req, res) {
  const data = await req.json();
  const client = await clientPromise;
  const CLIENT_DB  = 'clients';
  const client_db = client.db(CLIENT_DB);

  const exists = await client_db.collection('emails').find({ email: data.email }).toArray();

  if (exists.length > 0) {
    const DB_NAME = exists[0].db_name;
    const db = client.db(DB_NAME);
    const account = await db.collection('account').find({ email: data.email }).toArray();

    const hashedPass = account[0].password;
    const match = await bcrypt.compareSync(data.password, hashedPass);
    if (match) {
        const settings = await db.collection('settings').find().toArray();
        return NextResponse.json({ success: true, message: { ...account[0], ...settings[0] } });
    } else {
        return NextResponse.json({ success: true, message: 'Wrong Password!' });
    }
  } else {
    return NextResponse.json({ success: true, message: 'No such email address in our records!' });
  }
}
