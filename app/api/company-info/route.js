import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
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
          password: hashedpass 
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

          await clientdb.collection('links').insertOne({})

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
          return NextResponse.json({ success: true, data: result });  
        }
      } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
      }
    }
}
