import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";

const bcrypt = require('bcrypt');

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const organization = searchParams.get('organization');
  const event = searchParams.get('event');
  const userId = searchParams.get('user');
  const country = searchParams.get('country');
  const device = searchParams.get('device');
  const leadData = searchParams.get('leadData');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const flag = searchParams.get('flag');

  const DB_NAME = getDbName(organization)
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  try {
    const result = await db.collection('analytics').insertOne({
      event,
      time: new Date(),
      user: userId ? userId : '',
      country: country ? country : '',
      flag: flag ? flag : '',
      device: device ? device : '',
      leadData: leadData ? leadData : '',
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
