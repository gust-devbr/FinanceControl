/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

import * as Icon from "lucide-react"

import { HStack } from "@/components/common/h-stack";
import { FinanceType } from "../../types";

import { EditFinanceSheet } from "@/modules/finance/components/EditFinanceSheet"
import { useModalStore } from "@/store/use-modal-finance-store"
import { useDeleteFinance } from "../../hooks/finance-hooks"

export const columns: ColumnDef<FinanceType>[] = [
    {
        accessorKey: "name",
        header: "Descrição",
    },
    {
        accessorKey: "value",
        header: "Valor (R$)",
        cell: ({ row }) =>
            new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(row.original.amount),
    },
    {
        accessorKey: "category",
        header: "Categoria",
        cell: ({ row }) => {
            const color = row.original.category.color

            return (
                <HStack>
                    <div style={{ backgroundColor: color }} className="w-4 h-4 rounded-full" />
                    <p style={{ color }}>{row.original.category.name}</p>
                </HStack>
            )
        }
    },
    {
        accessorKey: "date",
        header: "Data",
        cell: ({ row }) =>
            new Date(row.original.createdAt).toLocaleDateString("pt-BR")
    },
    {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
            const { openEditFinance } = useModalStore()
            const deleteFinance = useDeleteFinance()

            return (
                <div className="flex items-center py-2">
                    <ButtonGroup>
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => openEditFinance(row.original)}
                        >
                            Editar
                            <Icon.Pencil />
                        </Button>

                        <ButtonGroupSeparator />

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteFinance.mutateAsync(row.original.id)}
                        >
                            Excluir
                            <Icon.Trash />
                        </Button>
                    </ButtonGroup>

                    <EditFinanceSheet />
                </div>
            )
        }
    }
]