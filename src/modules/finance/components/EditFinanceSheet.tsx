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

import { updateFinanceSchema, UpdateFinanceSchemaType } from "@/modules/finance/schemas/finance-schema"
import { useUpdateFinance } from "@/modules/finance/hooks/finance-hooks"
import { useCategory } from "@/modules/category/hooks/category-hooks"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useModalStore } from "@/store/use-modal-finance-store"
import { getErrorMessage } from "@/utils/get-axios-error"
import { SchemaErrorMsg } from "@/utils/schema-error-msg"

export function EditFinanceSheet() {
    const isOpen = useModalStore((state) => state.modals.editFinance ?? false)
    const { selectedFinance, closeEditFinance } = useModalStore()

    const updateFinance = useUpdateFinance()
    const category = useCategory()

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isDirty }
    } = useForm<UpdateFinanceSchemaType>({
        resolver: zodResolver(updateFinanceSchema),
    })

    useEffect(() => {
        if (!selectedFinance) return
        const { id, name, amount, categoryId } = selectedFinance

        reset({
            id,
            name,
            amount,
            categoryId
        })
    }, [selectedFinance, reset])


    async function onSubmit(data: UpdateFinanceSchemaType) {
        try {
            const { id, ...rest } = data

            const res = await updateFinance.mutateAsync({ id, ...rest })

            if (res.success) {
                reset()
                closeEditFinance()
            }
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={closeEditFinance}>
            <SheetTrigger />

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
                        {errors.name && <SchemaErrorMsg message={errors.name.message} />}
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
                        {errors.amount && <SchemaErrorMsg message={errors.amount.message} />}
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
                        {errors.categoryId && <SchemaErrorMsg message={errors.categoryId.message} />}
                    </section>

                    <SheetFooter>
                        <Button
                            disabled={isSubmitting || !isDirty}
                            type="submit"
                            variant="secondary"
                            className="py-4"
                        >
                            {isSubmitting
                                ? <Spinner className="w-6! h-6!" />
                                : "Salvar"
                            }
                        </Button>

                        <SheetClose asChild>
                            <Button type="button" variant="outline">
                                Fechar
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
