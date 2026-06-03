import { Finance } from "../finance/types"

export type Category = {
    id: string
    name: string
    color: string,
    finances: Finance[]
}