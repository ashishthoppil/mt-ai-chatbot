import { getAnalyticsDb } from "@/lib/analytics";
import clientPromise from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

const bcrypt = require('bcrypt');

export async function GET(req, res) {
  const DB_NAME = process.env.DB_NAME
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const organization = searchParams.get('organization');
  const event = searchParams.get('event');
  const userId = searchParams.get('user');
  const country = searchParams.get('country');
  const device = searchParams.get('device');
  const summary = searchParams.get('summary');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');

  try {
    const result = await db.collection(getAnalyticsDb(organization, id)).insertOne({
      event,
      time: new Date(),
      user: userId ? userId : '',
      country: country ? country : '',
      device: device ? device : '',
      summary: summary ? summary : '',
      email: email ? email : '',
      phone: phone ? phone : ''
    });

    if (result.acknowledged) {
      return NextResponse.json({ success: true, data: result });
    }
    return NextResponse.json({ success: false, message: 'Something went wrong!' });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
