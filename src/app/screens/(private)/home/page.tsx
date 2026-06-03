"use client"

import { TableFinances } from "@/components/modules/home/layout/Table"
import { ChartFinance } from "@/components/modules/home/layout/Chart"
import { HeaderHome } from "@/components/modules/home/layout/Header"
import { FormFinance } from "@/components/modules/home/layout/Form"

export default function HomePage() {
    return (
        <>
            <main className="p-5 border border-slate-900/80 rounded-sm w-full h-full">
                <HeaderHome />

                <section className="grid md:grid-cols-2 gap-6 my-6">
                    <FormFinance />
                    <ChartFinance />
                </section>

                <TableFinances />
            </main>
        </>
    )
}
