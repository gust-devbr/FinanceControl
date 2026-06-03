"use client"

import { useEffect, useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

import {
    createCategorySchema,
    type CreateCategoryType,
    type UpdateCategoryType,
} from "@/modules/category/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateCategory } from "@/modules/category/hooks"

import { Pencil } from "lucide-react"

export function DialogEditCategory({ id, name, color }: UpdateCategoryType) {
    const [open, setOpen] = useState<boolean>(false)

    const updateCategory = useUpdateCategory()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors, isDirty }
    } = useForm<CreateCategoryType>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            color: "",
            name: ""
        }
    })

    useEffect(() => {
        reset({
            name,
            color,
        })
    }, [name, color, id, reset])

    async function onSubmit(data: CreateCategoryType) {
        try {
            const res = await updateCategory.mutateAsync({ id, ...data })

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
                <Button variant="ghost" className="hover:bg-transparent hover:text-white">
                    <Pencil />
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-slate-800 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl">Crie uma nova categoria</DialogTitle>
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
                            disabled={isSubmitting || !isDirty}
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
