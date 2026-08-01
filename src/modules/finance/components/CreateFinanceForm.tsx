"use client"

import { type CreateFinanceSchemaType, createFinanceSchema } from "@/modules/finance/schemas/finance-schema"
import { useCreateFinance } from "@/modules/finance/hooks/finance-hooks"
import { useCategory } from "@/modules/category/hooks/category-hooks"

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
import { getErrorMessage } from "@/utils/get-axios-error"
import { SchemaErrorMsg } from "@/utils/schema-error-msg"

export function CreateFinanceForm() {
    const finance = useCreateFinance()
    const category = useCategory()

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid }
    } = useForm<CreateFinanceSchemaType>({
        resolver: zodResolver(createFinanceSchema),
        defaultValues: {
            name: "",
            amount: 0,
            categoryId: ""
        }
    })

    async function onSubmit(data: CreateFinanceSchemaType) {
        try {
            const res = await finance.mutateAsync(data)

            if (res.success) {
                toast.success(res.message)
                reset()
            }
        } catch (error) {
            toast.error(getErrorMessage(error))
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
                        {errors.name && <SchemaErrorMsg message={errors.name.message} />}
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
                                    <SelectTrigger className="bg-slate-800/50 w-full rounded-sm py-5">
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup className="space-y-2">
                                            {category.isLoading && <p>Carregando...</p>}

                                            {category?.data?.map((cat) => (
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
