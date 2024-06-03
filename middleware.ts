import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {cookies} from "next/headers";
import {verifySession} from "@/utils/session";

export async function middleware(request: NextRequest) {
    try {
        const session = cookies().get('session')?.value;
        if (!session) {
            throw new Error("Missing session");
        }
        await verifySession(session);
        return NextResponse.next();
    } catch (e) {
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
}

export const config = {
    matcher: ['/api/auth/logout', '/api/users/me/:path*'],
}
