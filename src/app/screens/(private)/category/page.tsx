"use client"

import { CategoryHeader } from "@/modules/category/components/CategoryHeader";
import { CategoriesTable } from "@/modules/category/components/CategoriesTable";

export default function CategoryPage() {
    return (
        <>
            <main className="p-5 border border-slate-900/80 rounded-sm w-full h-full space-y-5">
                <CategoryHeader />
                <CategoriesTable />
            </main>
        </>
    )
}

