import { optionalField } from "@/utils/optional-field"
import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha muito curta"),
})

export const loginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha muito curta"),
})

export const updateUserSchema = z.object({
    name: optionalField(
        z.string().min(1, "Nome obrigatório"),
    ),
    email: optionalField(
        z.email("Email inválido"),
    ),
    password: optionalField(
        z.string().min(1, "Senha obrigatória"),
    ),
    newPassword: optionalField(
        z.string().min(6, "Senha muito curta"),
    )
})

export const deleteUserSchema = z.object({
    password: z.string().min(1, "Senha obrigatória"),
})

export type RegisterSchemaType = z.infer<typeof registerSchema>
export type LoginSchemaType = z.infer<typeof loginSchema>
export type UpdateUserType = z.input<typeof updateUserSchema>
export type DeleteUserType = z.infer<typeof deleteUserSchema>
