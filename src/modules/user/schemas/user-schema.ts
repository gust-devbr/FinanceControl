import { z } from "zod"

export const updateUserSchema = z.object({
    name: z.
        string()
        .min(1, "Nome obrigatório")
        .optional(),

    email: z
        .email("Email inválido")
        .optional(),

})

export const deleteUserSchema = z.object({
    password: z
        .string()
        .min(1, "Senha obrigatória"),

    confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
})

export type UpdateUserSchemaType = z.input<typeof updateUserSchema>
export type DeleteUserSchemaType = z.infer<typeof deleteUserSchema>
