import jwt from "jsonwebtoken"
import { Password } from "@/utils/class/Password";

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

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        )

        return { user, token }
    }

    async login(body: LoginSchemaType) {
        const exists =
            await this.repository.findByEmail(body.email)

        if (!exists)
            throw new Error("Credenciais inválidas")

        if (!(await Password.compare(body.password, exists.password)))
            throw new Error("Credenciais inválidas")


        const token = jwt.sign(
            { id: exists.id },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        )

        return {
            user: exists,
            token
        }
    }
}