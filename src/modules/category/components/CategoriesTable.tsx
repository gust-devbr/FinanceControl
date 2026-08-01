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

import { CreateCategoryDialog } from "@/modules/category/components/CreateCategoryDialog"
import { EditCategoryDialog } from "@/modules/category/components/EditCategoryDialog"

import { useCategory, useDeleteCategory } from "@/modules/category/hooks/category-hooks"

import { Trash2 } from "lucide-react"
import { HStack } from "@/components/common/h-stack"

export function CategoriesTable() {
    const { data: categories, isLoading } = useCategory()
    const deleteCategory = useDeleteCategory()

    return (
        <>
            {isLoading
                ? <Skeleton className="h-full max-h-[25%] border-slate-700 bg-slate-800" />
                : (
                    <Card className="border-slate-700 rounded-md bg-slate-800 text-white px-1">
                        <CardHeader>
                            <CardTitle className="text-xl">Lista de Categorias</CardTitle>
                            <CardAction>
                                <CreateCategoryDialog />
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
                                    {categories?.map(cat => (
                                        <TableRow key={cat.id}>
                                            <TableCell className="max-w-50">
                                                <p className="text-zinc-300 text-[16px] font-semibold">
                                                    {cat.name}
                                                </p>
                                                <p className="text-[12px] text-zinc-400">
                                                    {cat._count.finances} gasto(s)
                                                </p>
                                            </TableCell>

                                            <TableCell>
                                                <HStack className="gap-1">
                                                    <div
                                                        className="w-5 h-5 rounded-full"
                                                        style={{ backgroundColor: cat.color }}
                                                    />
                                                    {cat.color.toUpperCase()}
                                                </HStack>
                                            </TableCell>

                                            <TableCell>
                                                <EditCategoryDialog />

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
