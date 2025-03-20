import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const cookieStore = await cookies();
        cookieStore.delete('organization');
        cookieStore.delete('email');
        return NextResponse.json({ success: true, message: 'logged out' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
