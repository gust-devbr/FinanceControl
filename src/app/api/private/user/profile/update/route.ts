import type { NextRequest } from "next/server";
import { Response } from "next-lib-utils";
import { getToken } from "@/utils/auth";
import { userService } from "@/services/user-service";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const { name, email, password, newPassword } = await req.json()

        if (!password && newPassword) return Response.error("Senha atual obrigatória", null, 400)

        if (password && newPassword) {
            if (password === newPassword) return Response.error("Nova senha não pode ser igual a atual", null, 400)

            const findUser = await userService.getById(user.id)
            if (!findUser) return Response.error("Usuário não encontrado", null, 404)

            const valid = await bcrypt.compare(password, findUser.password)
            if (!valid) return Response.error("Senha incorreta", null, 400)
        }

        await userService.update({
            id: user.id,
            name,
            email,
            password: newPassword
        })

        return Response.success(null, "Dados atualizados com sucesso")
    } catch (error) {
        return Response.error("Erro ao atualizar dados", error)
    }
}
