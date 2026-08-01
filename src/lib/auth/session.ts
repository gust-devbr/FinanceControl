import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createSessionToken(userId: string) {
    const jwt = await new SignJWT({ id: userId })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime("7d")
        .sign(secret);

    (await cookies()).set("session", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
}

export async function getSessionToken() {
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) return null;

    try {
        const { payload } = await jwtVerify(sessionCookie, secret);
        return payload.id as string;
    } catch {
        return null;
    }
}

export async function clearSessionToken() {
    (await cookies()).delete("session");
}