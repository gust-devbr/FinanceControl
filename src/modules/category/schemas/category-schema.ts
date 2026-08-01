import { z } from "zod"

export const createCategorySchema = z.object({
    name: z
        .string()
        .min(1, "Nome obrigatório"),

    color: z
        .string()
        .min(1, "Cor obrigatória"),
})

export const updateCategorySchema = z.object({
    id: z.string(),

    name: z
        .string()
        .min(1, "Nome obrigatório")
        .optional(),

    color: z
        .string()
        .min(1, "Cor obrigatória")
        .optional(),
})


export type CreateCategorySchemaType = z.infer<typeof createCategorySchema>
export type UpdateCategorySchemaType = z.infer<typeof updateCategorySchema> 
