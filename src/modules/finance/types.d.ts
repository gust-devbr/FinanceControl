import { Category } from "../category/types"

export type Finance = {
    id: string
    name: string
    amount: number
    categoryId: string
    createdAt: Date
    category?: Category
}