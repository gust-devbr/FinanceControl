"use client"

import {
    Table,
    TableRow,
    TableBody,
    TableHead,
    TableCell,
    TableHeader,
} from "@/components/ui/table"
import {
    Card,
    CardAction,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

import { DialogCreateCategory } from "./DialogCreate"
import { DialogEditCategory } from "./DialogEdit"

import { useCategory, useDeleteCategory } from "@/modules/category/hooks"

import { Trash2 } from "lucide-react"

export function TableCategories() {
    const categories = useCategory()
    const deleteCategory = useDeleteCategory()

    const loading = categories.isLoading

    return (
        <>
            {loading
                ? <Skeleton className="h-full max-h-[25%] border-slate-700 bg-slate-800" />
                : (
                    <Card className="border-slate-700 rounded-md bg-slate-800 text-white px-1">
                        <CardHeader>
                            <CardTitle className="text-xl">Lista de Categorias</CardTitle>
                            <CardAction>
                                <DialogCreateCategory />
                            </CardAction>
                        </CardHeader>

                        <ScrollArea className="h-72">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-white">Categoria</TableHead>
                                        <TableHead className="text-white">Cor</TableHead>
                                        <TableHead className="text-white">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {categories.data?.map(cat => (
                                        <TableRow key={cat.id}>
                                            <TableCell className="max-w-50">
                                                <p className="text-zinc-300 text-[16px] font-semibold">
                                                    {cat.name}
                                                </p>
                                                <p className="text-[12px] text-zinc-400">
                                                    {cat.finances.length} gasto(s)
                                                </p>
                                            </TableCell>

                                            <TableCell className="flex flex-row gap-1 items-center">
                                                <div
                                                    className="w-5 h-5 rounded-full"
                                                    style={{ backgroundColor: cat.color }}
                                                />
                                                {cat.color.toUpperCase()}
                                            </TableCell>

                                            <TableCell>
                                                <DialogEditCategory
                                                    id={cat.id}
                                                    name={cat.name}
                                                    color={cat.color}
                                                />

                                                <Button
                                                    variant="destructive"
                                                    onClick={() => deleteCategory.mutateAsync(cat.id)}
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                    </Card >
                )
            }
        </>
    )
}
