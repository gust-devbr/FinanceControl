import { z } from "zod"

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Nome obrigatório")
        .trim(),

    email: z
        .email("Insira um e-mail válido")
        .trim(),

    password: z
        .string()
        .min(6, "Senha muito curta"),
})

export const loginSchema = z.object({
    email: z
        .email("Insira um e-mail válido")
        .trim(),

    password: z
        .string()
        .min(1, "Digite sua senha"),
})

export type RegisterSchemaType = z.infer<typeof registerSchema>
export type LoginSchemaType = z.infer<typeof loginSchema>
