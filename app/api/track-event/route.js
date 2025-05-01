import { PLANS } from "@/lib/constants";
import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";

const bcrypt = require('bcrypt');

export async function GET(req, res) {

  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

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
    const account = await db.collection('account').find().toArray();


    if (PLANS.BASIC.includes(account[0].subscriptionName)) {
      return NextResponse.json({ success: false, message: 'Not authorized, Please upgrade plan to track events' }, { headers });
    }

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
      return NextResponse.json({ success: true, data: result }, { headers });
    }
    return NextResponse.json({ success: false, message: 'Something went wrong!' }, { headers });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { headers });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
      status: 204,
      headers: {
          "Access-Control-Allow-Origin": "https://ashishbthoppil.netlify.app",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
  });
}
