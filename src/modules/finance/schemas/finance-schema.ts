import { z } from "zod"

export const createFinanceSchema = z.object({
    name: z
        .string()
        .min(1, "Nome obrigatório"),

    amount: z
        .number()
        .min(1, "Valor mínimo de R$ 1"),

    categoryId: z
        .string()
        .min(1, "Categoria obrigatória")
})

export const updateFinanceSchema = z.object({
    name: z
        .string()
        .min(1, "Nome obrigatório")
        .optional(),

    amount: z
        .number()
        .min(1, "Valor mínimo de R$ 1")
        .optional(),

    categoryId: z
        .string()
        .optional()
})

export type CreateFinanceSchemaType = z.infer<typeof createFinanceSchema>
export type UpdateFinanceSchemaType = z.infer<typeof updateFinanceSchema>
