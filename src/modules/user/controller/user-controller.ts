import type { NextRequest } from "next/server";

import { UserService } from "../service/user-service";
import *  as schemas from "../schemas/user-schema";

import { Response } from "@/utils/class/Response";
import { getSessionToken } from "@/lib/auth/session";
export class UserController {
    constructor(private readonly service = new UserService()) { }

    async getHandler() {
        try {
            const userId = await getSessionToken()
            if (!userId)
                return Response.error("Não autorizado", 401)

            const findUser =
                await this.service.getUser(userId)

            return Response.success({ user: findUser })
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

    async putHandler(req: NextRequest) {
        try {
            const userId = await getSessionToken()
            if (!userId)
                return Response.error("Não autorizado", 401)

            const body =
                schemas.updateUserSchema.parse(await req.json())

            const updated =
                await this.service.updateUser(userId, body)

            return Response.success({ user: updated }, "Dados atualizados")
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

    async deleteHandler(req: NextRequest) {
        try {
            const userId = await getSessionToken()

            if (!userId)
                return Response.error("Não autorizado", 401)

            const body =
                schemas.deleteUserSchema.parse(await req.json())

            await this.service.deleteUser(userId, body)

            return Response.success(null, "Conta excluída")
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

}