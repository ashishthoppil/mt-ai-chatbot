import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const request = await req.json();
    const isDashboard = request.isDashboard;
    const cookieStore = await cookies();
    if (isDashboard && !cookieStore.get('organization')) {
        return NextResponse.json({ success: false, message: 'User is unauthenticated!' });
    }
    const client = await clientPromise;
    const DB_NAME = getDbName(request.organization);
    const db = client.db(DB_NAME);

    try {
        const account = await db.collection('account').find().toArray();

        // Check free trial expiry
        if (account[0].hasOwnProperty("freeTrialEnd") && account[0].freeTrialEnd && account[0].freeTrialEnd < new Date()) {
            const result = await db.collection('account').updateOne(
                {},
                {
                  $set: { 
                    subscriptionName: 'Kulfi AI - Basic',
                    isSubscribed: false,
                    chatCount: 0,
                    fileLimit: 0,
                    fileSizeLimit: 0,
                    linkLimit: 0,
                    freeTrialEnd: null
                  },
                  $currentDate: { lastModified: true }
                }
            );
        }

        // Check if subscription renewal is overdue
        // if (account[0].renews_at) {
        //     const renewalGracePeriod = account[0].renews_at.setDate(account[0].renews_at.getDate() + 10);
        //     if (renewalGracePeriod < new Date()) {
    
        //         const lemon = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${account[0].subscriptionId}`, {
        //             method: 'DELETE',
        //             headers: {
        //                 Authorization: `Bearer ${process.env.LEMON_PRIVATE_KEY}`
        //             }
        //         });
            
        //         const payload = await lemon.json()
    
        //         const result = await db.collection('account').updateOne(
        //             {},
        //             {
        //               $set: { 
        //                 subscriptionName: 'Kulfi AI - Basic',
        //                 isSubscribed: false,
        //                 chatCount: 0,
        //                 fileLimit: 0,
        //                 fileSizeLimit: 0,
        //                 linkLimit: 0,
        //                 freeTrialEnd: null
        //               },
        //               $currentDate: { lastModified: true }
        //             }
        //         );
        //     }
        // }

        const settings = await db.collection('settings').find().toArray();
        const links = await db.collection('links').find().toArray();
        const documents = await db.collection('documents').find().toArray();
        const count = await db.collection('chats').count();
        const fileNames = documents.map((item) => {
            return {
                id: item._id.toString(),
                fileName: item.fileName
            }
        })
        if (account.length > 0 && settings.length) {
            return NextResponse.json({ success: true, data: { ...account[0], ...settings[0] }, links: links.length > 0 ? links[0].links : [], fileNames, count });
        } 
        return NextResponse.json({ success: false, message: 'Something went wrong!' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
