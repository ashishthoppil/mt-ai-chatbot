import { NextResponse } from "next/server";


function jsonToFormattedString(obj) {
    return Object.entries(obj)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
}

export async function POST(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const data = await req.json();

    try {
        const body = {
            content: jsonToFormattedString(data)
        }
        const res = await fetch(`https://hooks.zapier.com/hooks/catch/18083815/2legzwu?email=${email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        
        const sample = await res.json();
        return NextResponse.json({ success: true, data: res });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
