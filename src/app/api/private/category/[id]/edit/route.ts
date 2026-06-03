import { categoryService } from "@/services/category-service";
import { Response } from "next-lib-utils";
import { getToken } from "@/utils/auth";
import { type NextRequest } from "next/server";

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const { id } = await params
        const { name, color } = await req.json()

        await categoryService.edit({
            id,
            name,
            color
        })

        return Response.success(null, "Categoria alterada")
    } catch (error) {
        return Response.error("Erro ao deletar categoria", error)
    }
}
