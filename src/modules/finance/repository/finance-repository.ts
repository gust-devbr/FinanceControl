import { prisma } from "@/lib/prisma";

import { CreateFinanceSchemaType, UpdateFinanceSchemaType } from "../schemas/finance-schema";
import { FinanceQuery } from "../types";

export class FinanceRepository {

    async findAllByUserId(userId: string, query: FinanceQuery) {
        const skip = (query.page - 1) * query.limit

        return await prisma.finance.findMany({
            skip,
            take: query.limit,
            where: {
                userId,
                name: { contains: query.search, mode: "insensitive" }
            },
            include: {
                category: { select: { id: true, name: true, color: true } }
            },
            orderBy: { createdAt: "desc" }
        })
    }

    async countByUserId(userId: string) {
        return await prisma.finance.count({ where: { userId } })
    }

    async findById(id: string) {
        return await prisma.finance.findFirst({ where: { id } })
    }

    async deleteById(id: string) {
        return await prisma.finance.delete({ where: { id } })
    }

    async create(userId: string, data: CreateFinanceSchemaType) {
        return await prisma.finance.create({
            data: { userId, ...data }
        })
    }

    async update(id: string, data: UpdateFinanceSchemaType) {
        return await prisma.finance.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.amount && { amount: data.amount }),
                ...(data.categoryId && { categoryId: data.categoryId }),
            }
        })
    }
}