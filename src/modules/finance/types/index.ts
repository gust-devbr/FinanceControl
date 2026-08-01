import { Finance } from "@prisma/client"

export interface FinanceQuery {
    search: string
    page: number
    limit: number
}

export interface FinanceResponse {
    finances: Finance[]
    pagination: {
        page: number
        limit: number
        totalItems: number
        totalPages: number
        hasNextPage: boolean
        hasPreviousPage: boolean
    }
}