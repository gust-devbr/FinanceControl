import { CategoryRepository } from "../repository/category-repository"

import type * as DTO from "../schemas/category-schema"

export class CategoryService {
    constructor(private readonly repository = new CategoryRepository()) { }

    async getAll(userId: string) {
        return await this.repository.findAllByUserId(userId)
    }

    async create(userId: string, data: DTO.CreateCategorySchemaType) {
        const existingCategory =
            await this.repository.findByNameAndColor(data.name, data.color)

        if (existingCategory)
            throw new Error("Categoria já existe com o mesmo nome e cor.")

        return await this.repository.create(userId, data)
    }

    async update(id: string, data: DTO.UpdateCategorySchemaType) {
        const existingCategory =
            await this.repository.findById(id)

        if (!existingCategory)
            throw new Error("Categoria não encontrada.")

        return await this.repository.update(id, data)
    }

    async delete(id: string) {
        const existingCategory =
            await this.repository.findById(id)

        if (!existingCategory)
            throw new Error("Categoria não encontrada.")

        await this.repository.deleteById(id)
    }
}