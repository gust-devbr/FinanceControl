import type { NextRequest, } from "next/server";
import { Response } from "@/utils/class/Response";

import * as schema from "../schemas/category-schema";
import { CategoryService } from "../service/category-service";

import { getToken } from "@/utils/auth";

export class CategoryController {
    constructor(private readonly service = new CategoryService()) { }

    async getHandler(req: NextRequest) {
        try {
            const user = await getToken(req)
            if (!user)
                return Response.error("Não autorizado", 401)

            const categories =
                await this.service.getAll(user.id)

            return Response.success(categories)
        } catch (error) {
            return Response.error((error as Error).message, 500)
        }
    }

    async postHandler(req: NextRequest) {
        try {
            const user = await getToken(req)
            if (!user)
                return Response.error("Não autorizado", 401)

            const body =
                schema.createCategorySchema.parse(await req.json())

            const category =
                await this.service.create(user.id, body)

            return Response.success({ category }, "Categoria criada", 201)
        } catch (error) {
            return Response.error((error as Error).message, 500)
        }
    }

    async putHandler(req: NextRequest, params: { id: string }) {
        try {
            const user = await getToken(req)
            if (!user)
                return Response.error("Não autorizado", 401)

            if (!params.id)
                return Response.error("ID não fornecido", 400)

            const body =
                schema.updateCategorySchema.parse(await req.json())

            const category =
                await this.service.update(params.id, body)

            return Response.success({ category }, "Categoria atualizada")
        } catch (error) {
            return Response.error((error as Error).message, 500)
        }
    }

    async deleteHandler(req: NextRequest, params: { id: string }) {
        try {
            const user = await getToken(req)
            if (!user)
                return Response.error("Não autorizado", 401)

            if (!params.id)
                return Response.error("ID não fornecido", 400)

            await this.service.delete(params.id)

            return Response.success(null, "Categoria excluída")
        } catch (error) {
            return Response.error((error as Error).message, 500)
        }
    }

}
