import { Response } from "next-lib-utils"
import { userService } from "@/services/user-service"
import { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()

        const existing = await userService.getUnique({ email })
        if (existing) return Response.error("Usuário já cadastrado", null, 409)

        const create = await userService.register({ name, email, password })

        const token = jwt.sign(
            { id: create.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        )

        const res = Response.success({ token }, "Cadastrado com sucesso", 201)
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
        })
        return res
    } catch (error) {
        return Response.error("Erro ao cadastrar", error)
    }
}
