import { prisma } from "@/lib/prisma";
import { Finance } from "@/modules/finance/types";

export const financeService = {
    getAll: async ({ userId }: { userId: string }) => {
        return await prisma.finance.findMany({
            where: { userId },
            include: {
                category: {
                    select: {
                        name: true,
                        color: true
                    }
                }
            }
        })
    },

    getById: async ({ id }: { id: string }) => {
        return await prisma.finance.findUnique({ where: { id } })
    },

    getByName: async ({ name }: { name: string }) => {
        return await prisma.user.findFirst({ where: { name } })
    },

    create: async ({
        userId,
        name,
        amount,
        categoryId
    }: {
        userId: string
        name: string
        amount: number
        categoryId: string
    }) => {
        return await prisma.finance.create({
            data: { userId, name, amount, categoryId }
        })
    },

    edit: async ({
        id,
        name,
        amount,
        categoryId
    }: {
        id: string
        name: string
        amount: number
        categoryId: string
    }) => {
        return await prisma.finance.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(amount && { amount }),
                ...(categoryId && { categoryId })
            }
        })
    },

    delete: async ({ id }: { id: string }) => {
        await prisma.finance.delete({ where: { id } })
    },
}
