import "server-only";
import {SignJWT, jwtVerify} from "jose";
import {User} from "@prisma/client";
import {cookies} from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
    try {
        const {payload} = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"]
        });
        return payload;
    } catch (e) {
        console.error("Failed to verify session");
        throw e;
    }
}

export async function createSession(userId: User["id"]) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });

    cookies().set("userId", userId, {
        httpOnly: false,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

export function deleteSession() {
    cookies().delete("session");
    cookies().delete("userId");
}

export async function getUserIdFromRequest(): Promise<string> {
    const cookie = cookies().get('session')?.value;
    const {userId} = await decrypt(cookie);
    return userId as string;
}
