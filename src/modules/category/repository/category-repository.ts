import { prisma } from "@/lib/prisma";

import type * as DTO from "../schemas/category-schema"

export class CategoryRepository {

    async findAllByUserId(userId: string) {
        return await prisma.category.findMany({
            where: { userId },
            include: { _count: { select: { finances: true } } },
            orderBy: { createdAt: "desc" }
        })
    }

    async findById(id: string) {
        return await prisma.category.findFirst({ where: { id } })
    }

    async findByNameAndColor(name: string, color: string) {
        return await prisma.category.findFirst({ where: { name, color } })
    }

    async create(userId: string, data: DTO.CreateCategorySchemaType) {
        return await prisma.category.create({ data: { userId, ...data } })
    }

    async deleteById(id: string) {
        await prisma.category.delete({ where: { id } })
    }

    async update(data: DTO.UpdateCategorySchemaType) {
        const { id, ...rest } = data

        return await prisma.category.update({
            where: { id },
            data: {
                ...(rest.name && { name: rest.name }),
                ...(rest.color && { color: rest.color })
            }
        })
    }

}
