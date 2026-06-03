import { optionalField } from "@/utils/optional-field"
import { z } from "zod"

export const createFinanceSchema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    amount: z.number().min(1, "Valor mínimo de R$ 1"),
    categoryId: z.string().min(1, "Categoria obrigatória")
})

export const updateFinanceSchema = z.object({
    name: optionalField(
        z.string().min(1, "Nome obrigatório"),
    ),
    amount: optionalField(
        z.number().min(1, "Valor mínimo de R$ 1"),
    ),
    categoryId: optionalField(
        z.string().min(1, "Categoria obrigatória")
    )
})

export type CreateFinanceType = z.infer<typeof createFinanceSchema>
export type UpdateFinanceType = z.infer<typeof updateFinanceSchema> & { id: string }
