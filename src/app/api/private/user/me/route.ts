import type { NextRequest } from "next/server";
import { Response } from "next-lib-utils";
import { getToken } from "@/utils/auth";
import { userService } from "@/services/user-service";

export async function GET(req: NextRequest) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const findUser = await userService.getById(user.id)
        if (!findUser) return Response.error("Usuário não encontrado", null, 404)

        const { password, ...safeUser } = findUser

        return Response.success({ user: safeUser })
    } catch (error) {
        return Response.error("Erro ao buscar dados do usuário", error)
    }
}
