"use client"

import { type CreateFinanceType, createFinanceSchema } from "@/modules/finance/schemas"
import { useCreateFinance } from "@/modules/finance/hooks"
import { useCategory } from "@/modules/category/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from 'react-hook-form'

import {
    Select,
    SelectItem,
    SelectGroup,
    SelectValue,
    SelectContent,
    SelectTrigger,
} from "@/components/ui/select"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import { Plus } from "lucide-react"

export function FormFinance() {
    const finance = useCreateFinance()
    const category = useCategory()

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid }
    } = useForm<CreateFinanceType>({
        resolver: zodResolver(createFinanceSchema),
        defaultValues: {
            name: "",
            amount: 0,
            categoryId: ""
        }
    })

    async function onSubmit(data: CreateFinanceType) {
        try {
            const res = await finance.mutateAsync(data)

            if (res.success) {
                toast.success("Sucesso", { description: res.message })
                reset()
            } else {
                toast.error("Erro", { description: res.message })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Card className="border-slate-700 bg-slate-800 p-4 w-full text-white">
            <CardTitle className="text-xl">Adicionar Gasto</CardTitle>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <section className="space-y-2">
                        <Label>Descrição</Label>
                        <Input
                            type="text"
                            className="bg-slate-800/50 rounded-sm py-5"
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
                            className="bg-slate-800/50 rounded-sm py-5"
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
                                    <SelectTrigger className="bg-slate-800/50 w-full rounded-sm py-5">
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

                    <section>
                        <Button
                            disabled={finance.isPending || !isValid}
                            type="submit"
                            className="
                                flex flex-row items-center w-full 
                                 bg-green-700 hover:bg-green-800
                                rounded-sm py-5 mt-2
                            ">
                            {isSubmitting
                                ? <Spinner className="w-6! h-6!" />
                                : (<>
                                    <Plus className="w-6! h-6!" />
                                    Adicionar Gasto
                                </>)
                            }
                        </Button>
                    </section>
                </form>
            </CardContent>
        </Card>
    )
}
