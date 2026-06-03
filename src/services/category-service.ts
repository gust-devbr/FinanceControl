import { prisma } from "@/lib/prisma";

export const categoryService = {
    getAll: async ({ userId }: { userId: string }) => {
        return await prisma.category.findMany({
            where: { userId },
            include: { finances: true }
        })
    },

    getById: async ({ id }: { id: string }) => {
        return await prisma.category.findUnique({ where: { id } })
    },

    getByName: async ({ name }: { name: string }) => {
        return await prisma.category.findFirst({ where: { name } })
    },

    delete: async ({ id }: { id: string }) => {
        await prisma.category.delete({ where: { id } })
    },

    create: async ({
        name,
        color,
        userId
    }: {
        name: string
        color: string
        userId: string
    }) => {
        return await prisma.category.create({
            data: { userId, name, color }
        })
    },

    edit: async ({
        id,
        name,
        color
    }: {
        id: string
        name: string
        color: string
    }) => {
        await prisma.category.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(color && { color }),
            }
        })
    },
}
