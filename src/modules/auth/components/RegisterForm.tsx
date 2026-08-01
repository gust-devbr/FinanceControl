"use client"

import { useState } from "react"
import Link from "next/link"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import { registerSchema, RegisterSchemaType } from "../schemas/auth-schema"
import { useRegister } from "../hooks/auth-hooks"
import { useForm } from "react-hook-form"

import { Eye, EyeOff, Lock, Mail, User, UserPlus2 } from "lucide-react"
import { getErrorMessage } from "@/utils/get-axios-error"
import { cn } from "@/lib/utils"

export function RegisterForm() {
    const onRegister = useRegister()

    const [showPass, setShowPass] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    })

    async function onSubmit(data: RegisterSchemaType) {
        try {
            const res = await onRegister.mutateAsync(data)

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
                    <h1 className="text-center text-2xl">Bem-Vindo!</h1>
                    <p className="text-center text-zinc-400">
                        Entre na sua conta
                    </p>
                </header>

                <div className="w-full bg-emerald-500 h-0.5 my-5" />

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center gap-5">
                    <section className="w-full space-y-2">
                        <Label>Nome completo</Label>
                        <InputGroup className="bg-slate-950/50 rounded-sm py-5">
                            <InputGroupInput
                                {...(register("name"))}
                                placeholder="Nome"
                            />
                            <InputGroupAddon>
                                <User className="w-5! h-5! text-emerald-500" />
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </section>

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
                                    <UserPlus2 className="w-5! h-5!" />
                                    Cadastrar
                                </>)}
                        </Button>
                    </section>
                </form>

                <footer className="mt-5 w-full flex flex-row justify-center items-center gap-1 text-[16px]">
                    <p>Já tem conta?</p>
                    {isSubmitting
                        ? <Spinner className="w-4! h-4! text-emerald-400" />
                        : (
                            <Link href={"/screens/login"} className="text-emerald-400 hover:underline">
                                Login
                            </Link>
                        )}
                </footer>
            </main>
        </div>
    )
}
