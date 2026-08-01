/* eslint-disable react-hooks/incompatible-library */
"use client"

import { useState } from "react"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { Search } from "lucide-react"
import { Pagination } from "../../types"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    loading?: boolean
    pagination: Pagination
}

export function DataTableFinance<TData, TValue>({
    columns,
    data,
    loading,
    pagination
}: DataTableProps<TData, TValue> & { loading: boolean }) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: { columnFilters }
    })

    return (
        <>
            <div className="flex items-center py-4">
                <InputGroup className="md:max-w-[30%]">
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                    <InputGroupInput
                        placeholder="Buscar registros..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => {
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }}
                    />
                </InputGroup>
            </div>

            <div className="overflow-hidden rounded-md border">
                {loading
                    ? <Skeleton className="h-full max-h-[25%] border-slate-700 bg-slate-800" />
                    : (
                        <Card className="border-slate-700 bg-slate-800 text-white px-1">
                            <ScrollArea>
                                <Table>
                                    <TableHeader>
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id} className="bg-accent">
                                                {headerGroup.headers.map((header) => {
                                                    return (
                                                        <TableHead key={header.id}>
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                        </TableHead>
                                                    )
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        {table.getRowModel().rows?.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    data-state={row.getIsSelected() && "selected"}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                                    No results.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>

                                <ScrollBar orientation="vertical" hidden />
                                <ScrollBar orientation="horizontal" hidden />
                            </ScrollArea>
                        </Card>
                    )}
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
                <span className="text-sm">
                    Página {pagination?.page} de {pagination?.totalPages}
                </span>

                <ButtonGroup>
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>

                    <ButtonGroupSeparator />

                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próximo
                    </Button>
                </ButtonGroup>
            </div>
        </>
    )
}