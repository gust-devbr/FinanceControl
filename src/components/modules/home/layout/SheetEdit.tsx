"use client"

import { useEffect, useState } from "react"

import {
    Sheet,
    SheetTitle,
    SheetClose,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
    SheetContent,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import {
    createFinanceSchema,
    type UpdateFinanceType,
    type CreateFinanceType
} from "@/modules/finance/schemas"
import { useUpdateFinance } from "@/modules/finance/hooks"
import { useCategory } from "@/modules/category/hooks"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Pencil } from "lucide-react"

export function SheetEditFinance({ id, amount, categoryId, name }: UpdateFinanceType) {
    const updateFinance = useUpdateFinance()
    const category = useCategory()

    const [open, setOpen] = useState<boolean>(false)

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm<CreateFinanceType>({
        resolver: zodResolver(createFinanceSchema),
        defaultValues: {
            name: "",
            amount: 0,
            categoryId: ""
        }
    })

    useEffect(() => {
        reset({
            name,
            amount,
            categoryId
        })
    }, [name, amount, categoryId, reset])


    async function onSubmit(data: CreateFinanceType) {
        try {
            const res = await updateFinance.mutateAsync({
                id,
                ...data
            })

            if (res.success) {
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
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="hover:bg-transparent hover:text-white">
                    <Pencil />
                </Button>
            </SheetTrigger>
            <SheetContent className="bg-slate-900/90 text-white">
                <SheetHeader>
                    <SheetTitle className="text-white text-xl">Editar Finança</SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex h-full flex-col px-2">
                    <section className="space-y-2">
                        <Label>Descrição</Label>
                        <Input
                            type="text"
                            className="bg-slate-800/50 rounded-sm py-4"
                            placeholder="Ex: Compra no mercado"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                    </section>

                    <section className="space-y-2">
                        <Label>Valor (R$)</Label>
                        <Input
                            type="number"
                            placeholder="0,00"
                            className="bg-slate-800/50 rounded-sm py-4"
                            {...register("amount", {
                                valueAsNumber: true
                            })}
                        />
                        {errors.amount && (
                            <p className="text-sm text-red-500">
                                {errors.amount.message}
                            </p>
                        )}
                    </section>

                    <section className="space-y-2">
                        <Label>Categoria</Label>
                        <Controller
                            control={control}
                            name="categoryId"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="bg-slate-800/50 w-full rounded-sm py-4">
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup className="space-y-2">
                                            {category.data?.map((cat) => (
                                                <SelectItem
                                                    key={cat.id}
                                                    style={{ backgroundColor: cat.color }}
                                                    value={cat.id}
                                                >
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.categoryId && (
                            <p className="text-sm text-red-500">
                                {errors.categoryId.message}
                            </p>
                        )}
                    </section>

                    <SheetFooter className="">
                        <Button disabled={isSubmitting || !isDirty} type="submit" variant="secondary" className="py-4">
                            {isSubmitting
                                ? <Spinner className="w-6! h-6!" />
                                : "Salvar"
                            }
                        </Button>
                        <SheetClose asChild>
                            <Button>
                                Fechar
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
