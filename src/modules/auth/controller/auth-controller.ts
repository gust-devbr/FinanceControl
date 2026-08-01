import type { NextRequest } from "next/server";

import { AuthService } from "../service/auth-service";
import * as schema from "../schemas/auth-schema"

import { Response } from "@/utils/class/Response";
import { createSessionToken, clearSessionToken } from "@/lib/auth/session"

export class AuthController {
    constructor(private readonly service = new AuthService()) { }

    async registerPostHandler(req: NextRequest) {
        try {
            const body = schema.registerSchema.parse(await req.json())

            const user = await this.service.register(body)

            await createSessionToken(user.id)

            return Response.success({ user }, "Cadastro realizado", 201)
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

    async loginPostHandler(req: NextRequest) {
        try {
            const body = schema.loginSchema.parse(await req.json())

            const user = await this.service.login(body)

            await createSessionToken(user.id)

            return Response.success({ user }, "Login realizado")
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

    async logoutPostHandler() {
        await clearSessionToken()
        return Response.success(null, "Logout realizado")
    }

}