import { optionalField } from "@/utils/optional-field"
import { z } from "zod"

export const createCategorySchema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    color: z.string().min(1, "Cor obrigatória")
})

export const updateCategorySchema = z.object({
    name: optionalField(
        z.string().min(1, "Nome obrigatório")
    ),
    color: optionalField(
        z.string().min(1, "Cor obrigatória")
    )
})


export type CreateCategoryType = z.infer<typeof createCategorySchema>
export type UpdateCategoryType = z.infer<typeof updateCategorySchema> & { id: string }
