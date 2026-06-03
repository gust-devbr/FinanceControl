import { categoryService } from "@/services/category-service";
import { Response } from "next-lib-utils";
import { getToken } from "@/utils/auth";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const categories = await categoryService.getAll({ userId: user.id })

        return Response.success({ categories })
    } catch (error) {
        return Response.error("Erro ao buscar categorias", error)
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const { name, color } = await req.json()

        await categoryService.create({
            name,
            color,
            userId: user.id
        })

        return Response.success(null, "Categoria criada", 201)
    } catch (error) {
        return Response.error("Erro ao criar categoria", error)
    }
}