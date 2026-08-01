import type { NextRequest } from "next/server";

import { FinanceService } from "../service/finance-service";
import * as schema from "../schemas/finance-schema"

import { Response } from "@/utils/class/Response";
import { getToken } from "@/utils/auth";

import { FinanceQuery } from "../types";

export class FinanceController {
    constructor(private readonly service = new FinanceService()) { }

    async getHandler(req: NextRequest) {
        try {
            const user = await getToken(req)
            if (!user)
                return Response.error("Não autorizado", 401)

            const { searchParams } = new URL(req.url)

            const query: FinanceQuery = {
                limit: Number(searchParams.get("limit") ?? "10"),
                page: Number(searchParams.get("page") ?? "1"),
                search: searchParams.get("search") ?? "",
            }

            const { finances, pagination } =
                await this.service.getFinances(user.id, { ...query })

            return Response.success({ finances, pagination })
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

    async postHandler(req: NextRequest) {
        try {
            const user = await getToken(req)
            if (!user)
                return Response.error("Não autorizado", 401)

            const body =
                schema.createFinanceSchema.parse(await req.json())

            const finance =
                await this.service.create(user.id, { ...body })

            return Response.success({ finance }, "Dado criado", 201)
        } catch (error) {
            return Response.error((error as Error).message)
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
                schema.updateFinanceSchema.parse(await req.json())

            const finance =
                await this.service.update(params.id, { ...body })

            return Response.success({ finance }, "Dado editado")
        } catch (error) {
            return Response.error((error as Error).message)
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

            return Response.success(null, "Dado excluído")
        } catch (error) {
            return Response.error((error as Error).message)
        }
    }

}