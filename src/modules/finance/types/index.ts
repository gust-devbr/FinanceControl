import { Finance } from "@prisma/client"

export interface FinanceQuery {
    search?: string
    page: number
    limit: number
}

export interface FinanceType extends Finance {
    category: {
        id: string
        name: string
        color: string
    }
}

export interface Pagination {
    page: number
    limit: number
    totalItems: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface FinanceResponse {
    finances: FinanceType[]
    pagination: Pagination
}   