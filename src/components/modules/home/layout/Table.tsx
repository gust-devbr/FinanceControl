"use client"

import {
    Table,
    TableRow,
    TableBody,
    TableHead,
    TableCell,
    TableHeader,
} from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

import { useDeleteFinance, useFinance } from "@/modules/finance/hooks"
import { formatCurrency } from "@/utils/formatCurrency"
import { formatDate } from "next-lib-utils"

import { SheetEditFinance } from "./SheetEdit"
import { Trash2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function TableFinances() {
    const finances = useFinance()
    const deleteFinance = useDeleteFinance()

    const loading = finances.isLoading

    return (
        <>
            {loading
                ? <Skeleton className="h-full max-h-[25%] border-slate-700 bg-slate-800" />
                : (
                    <Card className="border-slate-700 bg-slate-800 text-white px-1">
                        <ScrollArea className="h-72">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-white">Descrição</TableHead>
                                        <TableHead className="text-white">Valor (R$)</TableHead>
                                        <TableHead className="text-white hidden md:block">Categoria</TableHead>
                                        <TableHead className="text-white">Data</TableHead>
                                        <TableHead className="text-white md:max-w-10">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {finances.data?.map(f => (
                                        <TableRow key={f.id}>
                                            <TableCell className="max-w-50">
                                                <p className="text-zinc-300 whitespace-normal wrap-break-word max-w-[90px] md:max-w-full">
                                                    {f.name}
                                                </p>

                                                <div className="md:hidden flex flex-row items-center gap-1">
                                                    <div
                                                        className="w-4 h-4 rounded-full"
                                                        style={{ backgroundColor: f.category?.color }}
                                                    />
                                                    <p style={{ color: f.category?.color }}>
                                                        {f.category?.name}
                                                    </p>
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-zinc-400">
                                                {formatCurrency(f.amount)}
                                            </TableCell>

                                            <TableCell className="md:flex hidden">
                                                <Badge
                                                    className="hover:cursor-default"
                                                    style={{ backgroundColor: f.category?.color }}
                                                >
                                                    {f.category?.name}
                                                </Badge>
                                            </TableCell>

                                            <TableCell>
                                                {formatDate(f.createdAt)}
                                            </TableCell>

                                            <TableCell className="md:max-w-10">
                                                <SheetEditFinance
                                                    id={f.id}
                                                    name={f.name}
                                                    categoryId={f.categoryId}
                                                    amount={f.amount}
                                                />
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => deleteFinance.mutateAsync(f.id)}
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
                    </Card>
                )}
        </>
    )
}
