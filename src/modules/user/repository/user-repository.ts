import { prisma } from "@/lib/prisma";

import type { RegisterSchemaType } from "@/modules/auth/schemas/auth-schema";
import type { UpdateUserSchemaType } from "../schemas/user-schema";

export class UserRepository {

    async findByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } })
    }

    async findById(id: string) {
        return await prisma.user.findFirst({ where: { id } })
    }

    async create(data: RegisterSchemaType) {
        return await prisma.user.create({ data })
    }

    async deleteById(id: string) {
        await prisma.user.delete({ where: { id } })
    }

    async update(id: string, data: UpdateUserSchemaType) {
        return await prisma.user.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.email && { email: data.email }),
            }
        })
    }

}