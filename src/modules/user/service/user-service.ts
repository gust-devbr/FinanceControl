import { UserRepository } from "../repository/user-repository";
import { Password } from "@/utils/class/Password";

import type { DeleteUserSchemaType, UpdateUserSchemaType } from "../schemas/user-schema";

import { ResponseUser } from "@/utils/class/ResponseUser";

export class UserService {
    constructor(private readonly repository = new UserRepository()) { }

    async getUser(userId: string) {
        const user =
            await this.repository.findById(userId)

        if (!user)
            throw new Error("Usuário não encontrado")

        return ResponseUser.from(user)
    }

    async updateUser(id: string, data: UpdateUserSchemaType) {
        const user =
            await this.repository.findById(id)

        if (!user)
            throw new Error("Usuário não encontrado")

        const updated =
            await this.repository.update(user.id, { ...data })

        return ResponseUser.from(updated)
    }

    async deleteUser(userId: string, data: DeleteUserSchemaType) {
        const user =
            await this.repository.findById(userId)

        if (!user)
            throw new Error("Usuário não encontrado")

        if (data.password !== data.confirmPassword)
            throw new Error("Senhas não coincidem")

        if (!(await Password.compare(data.password, user.password)))
            throw new Error("Senha incorreta")

        await this.repository.deleteById(user.id)
    }

}