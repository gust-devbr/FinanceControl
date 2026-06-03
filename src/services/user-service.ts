import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const userService = {
    getById: async (id: string) => {
        return await prisma.user.findUnique({ where: { id } })
    },

    getUnique: async ({ email }: { email: string }) => {
        return await prisma.user.findFirst({
            where: { email }
        })
    },

    register: async ({
        name,
        email,
        password
    }: {
        name: string
        email: string
        password: string
    }) => {
        const hashedPassword = await bcrypt.hash(password, 10)
        return await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    },

    update: async ({
        id,
        name,
        email,
        password
    }: {
        id: string
        name: string
        email: string
        password: string
    }) => {
        const hashedPassword = password &&
            await bcrypt.hash(password, 10)

        await prisma.user.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(email && { email }),
                ...(hashedPassword && { password: hashedPassword })
            }
        })
    },

    delete: async (id: string) => {
        await prisma.user.delete({ where: { id } })
    },
}
