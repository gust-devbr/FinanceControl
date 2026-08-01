"use client"

import { useEffect } from "react"

import {
    Card,
    CardTitle,
    CardHeader,
    CardFooter,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import { Mail, User2 } from "lucide-react"

import { updateUserSchema, UpdateUserSchemaType } from "@/modules/user/schemas/user-schema"
import { useUpdateUser, useUser } from "@/modules/user/hooks/user-hooks"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { getErrorMessage } from "@/utils/get-axios-error"
import { SchemaErrorMsg } from "@/utils/schema-error-msg"

export function UpdateAccountCard() {
    const { data: user } = useUser()
    const updateUser = useUpdateUser()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isDirty, isSubmitting, errors }
    } = useForm<UpdateUserSchemaType>({
        resolver: zodResolver(updateUserSchema),
        mode: "onChange",
    })

    useEffect(() => {
        reset({
            name: user?.name,
            email: user?.email
        })
    }, [user, reset])

    async function onSubmit(data: UpdateUserSchemaType) {
        try {
            const res = await updateUser.mutateAsync(data)

            if (res.success)
                toast.success(res.message)

        } catch (error) {
            toast.error(getErrorMessage(error))
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

                        {errors.name && <SchemaErrorMsg message={errors.name?.message} />}
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

                        {errors.email && <SchemaErrorMsg message={errors.email?.message} />}
                    </section>
                </CardContent>

                {isDirty && (
                    <CardFooter className="bg-slate-700 justify-end gap-2">
                        <Button
                            type="button"
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
