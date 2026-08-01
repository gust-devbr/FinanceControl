"use client"

import { useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

import { Plus } from "lucide-react"

import { createCategorySchema, type CreateCategorySchemaType } from "@/modules/category/schemas/category-schema"
import { useCreateCategory } from "@/modules/category/hooks/category-hooks"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { getErrorMessage } from "@/utils/get-axios-error"
import { SchemaErrorMsg } from "@/utils/schema-error-msg"

export function CreateCategoryDialog() {
    const [open, setOpen] = useState<boolean>(false)

    const createCategory = useCreateCategory()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(createCategorySchema),
    })

    async function onSubmit(data: CreateCategorySchemaType) {
        try {
            const res = await createCategory.mutateAsync(data)

            if (res.success) {
                reset()
                setOpen(false)
            }
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-green-700 hover:bg-green-600 hover:translate-0.5"
                >
                    <Plus />
                    Nova Categoria
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-slate-800 text-white">
                <DialogHeader>
                    <DialogTrigger className="text-xl">Crie uma nova categoria</DialogTrigger>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 flex h-full flex-col my-2"
                >
                    <section className="space-y-2">
                        <Label>Nome da Categoria</Label>
                        <Input
                            type="text"
                            {...register("name")}
                        />
                        {errors.name && <SchemaErrorMsg message={errors.name.message} />}
                    </section>

                    <section className="space-y-2">
                        <Label>Cor da Categoria</Label>
                        <Input
                            type="color"
                            {...register("color")}
                        />
                        {errors.color && <SchemaErrorMsg message={errors.color.message} />}
                    </section>

                    <DialogFooter className="bg-slate-700">
                        <DialogClose onClick={() => reset()} type="button">
                            Fechar
                        </DialogClose>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? <Spinner className="w-5! h-5!" />
                                : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
