import { Finance } from "@prisma/client"

export type CategoryResponse = {
    id: string
    name: string
    color: string,
    _count: {
        finances: number
    }
}