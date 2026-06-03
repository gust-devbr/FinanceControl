import { Response } from "next-lib-utils"
import { userService } from "@/services/user-service"
import { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        const existing = await userService.getUnique({ email })
        if (!existing) return Response.error("Credenciais inválidas", null, 401)

        const valid = await bcrypt.compare(password, existing.password)
        if (!valid) return Response.error("Credenciais inválidas", null, 401)

        const token = jwt.sign(
            { id: existing.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        )

        const res = Response.success({ token }, "Logado com sucesso")
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
        })
        return res
    } catch (error) {
        return Response.error("Erro ao logar", error)
    }
}
