import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

async function getUserFromToken(tokenFromHeader: string | null) {
    const cookieStore = await cookies()

    const token = tokenFromHeader || cookieStore.get("token")?.value
    if (!token) return null

    try {
        return verify(
            token,
            process.env.JWT_SECRET as string
        ) as { id: string }
    } catch {
        return null
    }
}

export async function getToken(req?: NextRequest) {
    const authHeader = req?.headers.get("authorization")

    const tokenHeader = authHeader?.split(" ")[1] || null

    const user = await getUserFromToken(tokenHeader)
    if (!user) return null

    return user
}