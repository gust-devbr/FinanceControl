"use client"

import { useState } from "react"

import { CreateFinanceForm } from "@/modules/finance/components/CreateFinanceForm"
import { FinanceChart } from "@/modules/finance/components/FinanceChart"
import { HeaderHome } from "@/components/layout/Header"
import { useFinance } from "@/modules/finance/hooks/finance-hooks"

import { DataTableFinance } from "@/modules/finance/components/table/data-table"
import { columns } from "@/modules/finance/components/table/columns"

import { Pagination } from "@/modules/finance/types"

export default function HomePage() {
    const { data, isLoading } = useFinance({ limit: 10, page: 1 })

    return (
        <>
            <main className="p-5 border border-slate-900/80 rounded-sm w-full h-full">
                <HeaderHome />

                <section className="grid md:grid-cols-2 gap-6 my-6">
                    <CreateFinanceForm />
                    <FinanceChart />
                </section>

                <DataTableFinance
                    columns={columns}
                    data={data?.finances ?? []}
                    loading={isLoading}
                    pagination={data?.pagination as Pagination}
                />
            </main>
        </>
    )
}
