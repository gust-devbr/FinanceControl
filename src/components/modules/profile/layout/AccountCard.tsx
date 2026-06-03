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

import { Mail, User2 } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogout, useUpdateUser, useUser } from "@/modules/auth/hooks"

export function AccountCard() {
    const router = useRouter()

    const { data: user } = useUser()
    const updateUser = useUpdateUser()
    const logout = useLogout()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, isSubmitting, errors }
    } = useForm<UpdateUserType>({
        resolver: zodResolver(updateUserSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
        }
    })

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email
            })
        }
    }, [user, reset])

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
                    <CardTitle className="text-xl">Informações Pessoais</CardTitle>
                    <CardDescription>Gerencie seus dados</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <section className="space-y-2">
                        <Label>Nome</Label>
                        <InputGroup className="bg-slate-900 py-5 border-slate-400">
                            <InputGroupInput
                                {...register("name")}
                            />
                            <InputGroupAddon>
                                <User2 className="w-5! h-5! text-white" />
                            </InputGroupAddon>
                        </InputGroup>

                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </section>

                    <section className="space-y-2">
                        <Label>E-mail</Label>
                        <InputGroup className="bg-slate-900 py-5 border-slate-400">
                            <InputGroupInput
                                {...register("email")}
                            />
                            <InputGroupAddon>
                                <Mail className="w-5! h-5! text-white" />
                            </InputGroupAddon>
                        </InputGroup>

                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </section>
                </CardContent>

                {isDirty && (
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
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? <Spinner className="w-5! h-5!" />
                                : "Salvar"
                            }
                        </Button>
                    </CardFooter>
                )}
            </form>
        </Card>
    )
}
