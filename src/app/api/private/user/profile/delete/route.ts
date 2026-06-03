import { userService } from "@/services/user-service";
import type { NextRequest } from "next/server";
import { Response } from "next-lib-utils";
import { getToken } from "@/utils/auth";

export async function GET(req: NextRequest) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        await userService.delete(user.id)

        return Response.success(null, "Conta deletada com sucesso")
    } catch (error) {
        return Response.error("Erro ao deletar conta", error)
    }
}
