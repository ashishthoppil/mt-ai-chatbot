import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const cookieStore = await cookies();
        const exists = cookieStore.has('organization') && cookieStore.has('organization')
        return NextResponse.json({ success: true, data: exists });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
