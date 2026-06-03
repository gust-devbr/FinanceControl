"use client"

import { HeaderCategory } from "@/components/modules/category/layout/Header";
import { TableCategories } from "@/components/modules/category/layout/Table";

export default function CategoryManagePage() {
    return (
        <>
            <main className="p-5 border border-slate-900/80 rounded-sm w-full h-full space-y-5">
                <HeaderCategory />

                <TableCategories />
            </main>
        </>
    )
}

