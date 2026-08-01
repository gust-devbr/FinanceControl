import type { NextRequest } from "next/server";

import { AuthService } from "../service/auth-service";
import * as schema from "../schemas/auth-schema"

import { Response } from "@/utils/class/Response";

export class AuthController {
    constructor(private readonly service = new AuthService()) { }

    async registerPostHandler(req: NextRequest) {
        try {
            const body = schema.registerSchema.parse(await req.json())

            const { token, user } =
                await this.service.register(body)

            const response = Response.success({ user, token }, "Cadastro realizado", 201)

            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/"
            })
            return response
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

    async loginPostHandler(req: NextRequest) {
        try {
            const body = schema.loginSchema.parse(await req.json())

            const { token, user } =
                await this.service.login(body)

            const response = Response.success({ user, token }, "Login realizado")

            response.cookies.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/"
            })
            return response
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

    async logoutPostHandler() {
        const response = Response.success(null, "Logout realizado")
        response.cookies.delete("token")
        return response
    }

}