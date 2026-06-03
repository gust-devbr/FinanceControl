import { Response } from "next-lib-utils";
import { getToken } from "@/utils/auth";
import { financeService } from "@/services/finance-service";
import { type NextRequest } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const { id } = await params
        const { name, amount, categoryId } = await req.json()

        await financeService.edit({
            id,
            name,
            amount,
            categoryId
        })

        return Response.success(null, "Registro alterado")
    } catch (error) {
        return Response.error("Erro ao editar registro", error)
    }
}
