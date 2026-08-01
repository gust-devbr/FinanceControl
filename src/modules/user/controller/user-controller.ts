import type { NextRequest } from "next/server";

import { UserService } from "../service/user-service";
import { Response } from "@/utils/class/Response";
import { getToken } from "@/utils/auth";

import { updateUserSchema, deleteUserSchema } from "../schemas/user-schema";

export class UserController {
    constructor(private readonly service = new UserService()) { }

    async getHandler(req: NextRequest) {
        try {
            const user = await getToken(req)

            if (!user)
                return Response.error("Não autorizado", 401)

            const findUser =
                await this.service.getUser(user.id)

            return Response.success({ user: findUser })
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

    async putHandler(req: NextRequest) {
        try {
            const user = await getToken(req)

            if (!user)
                return Response.error("Não autorizado", 401)

            const body = updateUserSchema.parse(await req.json())

            const updated =
                await this.service.updateUser(user.id, { ...body })

            return Response.success({ user: updated }, "Dados atualizados")
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

    async deleteHandler(req: NextRequest) {
        try {
            const user = await getToken(req)

            if (!user)
                return Response.error("Não autorizado", 401)

            const body = deleteUserSchema.parse(await req.json())

            await this.service.deleteUser(user.id, { ...body })

            return Response.success(null, "Conta excluída")
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

}