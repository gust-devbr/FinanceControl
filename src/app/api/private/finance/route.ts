import { Response } from "next-lib-utils";
import { financeService } from "@/services/finance-service";
import { getToken } from "@/utils/auth";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const finances = await financeService.getAll({ userId: user.id })

        return Response.success({ finances })
    } catch (error) {
        return Response.error("Erro ao buscar registros", error)
    }
}

export async function POST(req: NextRequest) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const { name, amount, categoryId } = await req.json()

        const create = await financeService.create({
            userId: user.id,
            name,
            amount,
            categoryId
        })

        return Response.success({ finance: create })

    } catch (error) {
        return Response.error("Erro ao criar registro", error)
    }
}
