import type { CreateCategoryType, UpdateCategoryType } from "./schemas"
import { apiFetch } from "next-lib-utils"
import { Category } from "./types"

export async function getCategories() {
    const res = await apiFetch("/private/category")
    const categories: Category[] = res?.data?.categories
    return categories
}

export async function createCategory(data: CreateCategoryType) {
    return await apiFetch("/private/category", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function deleteCategory(id: string) {
    await apiFetch(`/private/category/${id}/delete`, {
        method: "DELETE"
    })
}

export async function updateCategory({
    id,
    name,
    color
}: UpdateCategoryType) {
    return await apiFetch(`/private/category/${id}/edit`, {
        method: "PUT",
        body: JSON.stringify({ name, color })
    })
}
