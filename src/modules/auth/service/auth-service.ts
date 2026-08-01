import { Password } from "@/utils/class/Password";
import { ResponseUser } from "@/utils/class/ResponseUser";

import { UserRepository } from "@/modules/user/repository/user-repository";
import type { LoginSchemaType, RegisterSchemaType } from "../schemas/auth-schema";
export class AuthService {
    constructor(private readonly repository = new UserRepository()) { }

    async register(body: RegisterSchemaType) {
        const { password, ...rest } = body

        if (await this.repository.findByEmail(rest.email))
            throw new Error("Email já cadastrado")

        const hashed = await Password.hash(password)

        const user = await this.repository.create({
            password: hashed,
            ...rest
        })

        return ResponseUser.from(user)
    }

    async login(body: LoginSchemaType) {
        const exists =
            await this.repository.findByEmail(body.email)

        if (!exists)
            throw new Error("Credenciais inválidas")

        if (!(await Password.compare(body.password, exists.password)))
            throw new Error("Credenciais inválidas")

        return ResponseUser.from(exists)
    }
}