import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    try {
        const res = await fetch(data.webhook, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        const sample = await res.json();
        console.log('samplesamplesamplesample', sample)
        return NextResponse.json({ success: true, data: res });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
