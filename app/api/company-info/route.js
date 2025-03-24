import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const bcrypt = require('bcrypt');

export async function POST(req, res) {
  const data = await req.json();
  if (data) {
    const DB_NAME = getDbName(data.organization);
    const ZAPIER_WEBHOOK = process.env.ZAPIER_WEBHOOK;
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const salt = bcrypt.genSaltSync(10);
    const hashedpass = bcrypt.hashSync(data.password, salt);
    try {
        const formattedData = { 
          organization: data.organization,
          email: data.email,
          website: data.website,
          domain: data.domain,
          password: hashedpass,
          chatCount: 500
        }
        const result = await db.collection('account').insertOne(formattedData);
      
        if (result.acknowledged) {
          const settings = await db.collection('settings').insertOne({
            domain: data.domain,
            botName: data.botName,
            color: data.color,
            cw: '400',
            tone: 'formal',
            escalation: '',
            alignment: 'right',
            responselength: 'medium' 
          });

          const clientdb = client.db('clients');

          const email = await clientdb.collection('emails').insertOne({
            email: data.email,
            db_name: DB_NAME
          })


          if (settings.acknowledged && email.acknowledged) {
            await fetch(ZAPIER_WEBHOOK, {
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

          const cookieStore = await cookies();
          const expiry = new Date(Date.now()+ 86400*1000);
          const salt = bcrypt.genSaltSync(10);
          cookieStore.set({
            name: 'organization',
            value: bcrypt.hashSync(data.organization, salt),
            expires: expiry
          });
          cookieStore.set({
            name: 'email',
            value: bcrypt.hashSync(data.email, salt),
            expires: expiry
          });
          return NextResponse.json({ success: true, data: result });  
        }
      } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
      }
    }
}
