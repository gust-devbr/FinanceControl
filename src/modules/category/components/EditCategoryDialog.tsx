"use client"

import { useEffect } from "react"

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

import { updateCategorySchema, type UpdateCategorySchemaType } from "@/modules/category/schemas/category-schema"
import { useUpdateCategory } from "@/modules/category/hooks/category-hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Pencil } from "lucide-react"
import { useModalStore } from "@/store/use-modal-category-store"

import { getErrorMessage } from "@/utils/get-axios-error"
import { SchemaErrorMsg } from "@/utils/schema-error-msg"

export function EditCategoryDialog() {
    const isOpen = useModalStore((state) => state.modals.editCategory ?? false)
    const { selectedCategory, closeEditCategory } = useModalStore()

    const updateCategory = useUpdateCategory()

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors, isDirty }
    } = useForm<UpdateCategorySchemaType>({
        resolver: zodResolver(updateCategorySchema),
    })

    useEffect(() => {
        if (!selectedCategory) return

        const { id, color, name } = selectedCategory

        reset({ id, name, color })
    }, [selectedCategory, reset])

    async function onSubmit(data: UpdateCategorySchemaType) {
        try {
            const res = await updateCategory.mutateAsync(data)

            if (res.success) {
                reset()
                closeEditCategory()
            }
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeEditCategory}>
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
