"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import {
    Card,
    CardTitle,
    CardHeader,
    CardFooter,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import {
    updateUserSchema,
    type UpdateUserType
} from "@/modules/auth/schemas"

import { Lock } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogout, useUpdateUser } from "@/modules/auth/hooks"

export function PasswordManagerCard() {
    const router = useRouter()

    const updateUser = useUpdateUser()
    const logout = useLogout()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, isSubmitting, errors }
    } = useForm<UpdateUserType>({
        resolver: zodResolver(updateUserSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
        }
    })

    async function onSubmit(data: UpdateUserType) {
        try {
            const res = await updateUser.mutateAsync(data)

            if (res.ok) {
                toast.success("Sucesso", { description: res.message })
                await logout.mutateAsync()
                setTimeout(() => router.replace("/screens/login"), 1000)
            } else {
                toast.error("Erro", { description: res.message })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card className="bg-slate-800 text-white">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <CardHeader>
                    <CardTitle className="text-xl">Alterar senha</CardTitle>
                    <CardDescription>Matenha sua conta segura</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <section className="space-y-2">
                        <Label>Senha Atual</Label>
                        <InputGroup className="bg-slate-900 py-5 border-slate-400">
                            <InputGroupInput
                                {...register("password")}
                                placeholder="Digite sua senha atual"
                            />
                            <InputGroupAddon>
                                <Lock className="w-4! h-4! text-white" />
                            </InputGroupAddon>
                        </InputGroup>

                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </section>

                    <section className="space-y-2">
                        <Label>Nova Senha</Label>
                        <InputGroup className="bg-slate-900 py-5 border-slate-400">
                            <InputGroupInput
                                {...register("newPassword")}
                                placeholder="Digite sua nova senha"
                            />
                            <InputGroupAddon>
                                <Lock className="w-4! h-4! text-white" />
                            </InputGroupAddon>
                        </InputGroup>

                        {errors.newPassword && (
                            <p className="text-sm text-red-500">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </section>
                </CardContent>
                <CardFooter className="bg-slate-700 justify-end gap-2">
                    <Button
                        variant="secondary"
                        onClick={() => reset()}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                    >
                        {isSubmitting
                            ? <Spinner className="w-5! h-5!" />
                            : "Salvar"
                        }
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
