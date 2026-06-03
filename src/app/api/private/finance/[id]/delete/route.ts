import { Response } from "next-lib-utils";
import { financeService } from "@/services/finance-service";
import { type NextRequest } from "next/server";
import { getToken } from "@/utils/auth";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const { id } = await params

        await financeService.delete({ id })

        return Response.success(null, "Registro deletado")
    } catch (error) {
        return Response.error("Erro ao deletar registro", error)
    }
}