"use client"

import { useState } from "react"
import Link from "next/link"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import { loginSchema, LoginSchemaType } from "../schemas/auth-schema"
import { useLogin } from "../hooks/auth-hooks"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react"
import { getErrorMessage } from "@/utils/get-axios-error"
import { cn } from "@/lib/utils"

export function LoginForm() {
    const login = useLogin()

    const [showPass, setShowPass] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    })

    async function onSubmit(data: LoginSchemaType) {
        try {
            const res = await login.mutateAsync(data)

            if (res.success)
                toast.success(res.message)

        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-screen md:px-0 px-5">
            <main className="border border-slate-900/80 p-5 w-full max-w-200 rounded-lg bg-slate-900/80">
                <header>
                    <h1 className="text-center text-2xl">Cadastro de Usuário</h1>
                    <p className="text-center text-zinc-400">
                        Crie uma conta para começar a controlar suas finanças
                    </p>
                </header>

                <div className="w-full bg-emerald-500 h-0.5 my-5" />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center gap-5">
                    <section className="w-full space-y-2">
                        <Label>E-mail</Label>
                        <InputGroup className="bg-slate-950/50 rounded-sm py-5">
                            <InputGroupInput
                                {...(register("email"))}
                                placeholder="E-mail"
                            />
                            <InputGroupAddon>
                                <Mail className="w-5! h-5! text-emerald-500" />
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </section>

                    <section className="w-full space-y-2">
                        <Label>Senha</Label>
                        <InputGroup className="bg-slate-950/50 rounded-sm py-5">
                            <InputGroupInput
                                {...(register("password"))}
                                placeholder="Mínimo 6 carecteres"
                                type={showPass ? "text" : "password"}
                            />
                            <InputGroupAddon>
                                <Lock className="w-5! h-5! text-emerald-500" />
                            </InputGroupAddon>

                            <InputGroupButton
                                type="button"
                                variant="link"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass
                                    ? <EyeOff className="w-5! h-5!" color="gray" />
                                    : <Eye className="w-5! h-5!" color="gray" />
                                }
                            </InputGroupButton>
                        </InputGroup>

                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </section>

                    <section className="w-full">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "flex flex-row items-center gap-1 w-full py-5 rounded-sm",
                                "bg-green-600 hover:bg-green-700 text-white"
                            )}
                        >
                            {isSubmitting
                                ? <Spinner className="w-6! h-6!" />
                                : (<>
                                    <LogIn className="w-5! h-5!" />
                                    Entrar
                                </>)}
                        </Button>
                    </section>
                </form>

                <footer className="mt-5 w-full flex flex-row justify-center items-center gap-1 text-[16px]">
                    <p>Não tem conta?</p>
                    {isSubmitting
                        ? <Spinner className="w-4! h-4! text-emerald-400" />
                        : (
                            <Link href={"/screens/register"} className="text-emerald-400 hover:underline">
                                Cadastre-se
                            </Link>
                        )}
                </footer>
            </main>
        </div>
    )
}
