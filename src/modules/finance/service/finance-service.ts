import { FinanceRepository } from "../repository/finance-repository";

import { CreateFinanceSchemaType, UpdateFinanceSchemaType } from "../schemas/finance-schema";
import { FinanceQuery } from "../types";

export class FinanceService {
    constructor(private readonly repository = new FinanceRepository()) { }

    async getFinances(userId: string, query: FinanceQuery) {
        const finances = await this.repository.findAllByUserId(userId, { ...query })
        const totalItems = await this.repository.countByUserId(userId)

        return {
            finances,
            pagination: {
                page: query.page,
                limit: query.limit,
                totalItems,
                totalPages: Math.ceil(totalItems / query.limit),
                hasNextPage: (query.page * query.limit) < totalItems,
                hasPreviousPage: query.page > 1
            }
        }
    }

    async create(userId: string, data: CreateFinanceSchemaType) {
        return await this.repository.create(userId, { ...data })
    }

    async update(id: string, data: UpdateFinanceSchemaType) {
        const finance =
            await this.repository.findById(id)

        if (!finance)
            throw new Error("Dado não encontrado")

        return await this.repository.update(finance.id, { ...data })
    }

    async delete(id: string) {
        const finance =
            await this.repository.findById(id)

        if (!finance)
            throw new Error("Dado não encontrado")

        await this.repository.deleteById(finance.id)
    }
}