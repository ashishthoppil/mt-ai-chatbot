import { NextResponse } from "next/server";

export async function POST(req, res) {
    const data = await req.json();
    try {
        const ZAPIER_CONTACT_WEBHOOK = process.env.ZAPIER_CONTACT_WEBHOOK
        const res = await fetch(ZAPIER_CONTACT_WEBHOOK, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return NextResponse.json({ success: true, data: res });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
