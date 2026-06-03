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

import {
    createCategorySchema,
    type CreateCategoryType,
} from "@/modules/category/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateCategory } from "@/modules/category/hooks"

import { Plus } from "lucide-react"
import { toast } from "sonner"

export function DialogCreateCategory() {
    const [open, setOpen] = useState<boolean>(false)

    const createCategory = useCreateCategory()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<CreateCategoryType>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: "",
            color: ""
        }
    })

    async function onSubmit(data: CreateCategoryType) {
        try {
            const res = await createCategory.mutateAsync(data)

            if (res.ok) {
                reset()
                setOpen(false)
            } else {
                toast.error("Erro", { description: res.message })
            }
        } catch (error) {
            console.error(error)
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
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </section>

                    <section className="space-y-2">
                        <Label>Cor da Categoria</Label>
                        <Input
                            type="color"
                            {...register("color")}
                        />
                        {errors.color && (
                            <p className="text-sm text-red-500">
                                {errors.color.message}
                            </p>
                        )}
                    </section>

                    <DialogFooter className="bg-slate-700">
                        <DialogClose onClick={() => reset()}>
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
