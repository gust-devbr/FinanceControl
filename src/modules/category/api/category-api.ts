import { api } from "@/lib/api"

import { CategoryResponse } from "../types"

import type * as DTO from "../schemas/category-schema"
import { ApiResponse } from "@/@types/api/api-response"

export async function getCategories(): Promise<CategoryResponse[]> {
    const { data } = await api.get("/private/category")
    return data.categories
}

export async function createCategory(data: DTO.CreateCategorySchemaType): Promise<ApiResponse> {
    const res = await api.post("/private/category", data)
    return res.data
}

export async function deleteCategory(id: string): Promise<ApiResponse> {
    const res = await api.delete(`/private/category/${id}`)
    return res.data
}

export async function updateCategory(
    data: DTO.UpdateCategorySchemaType & { id: string }
): Promise<ApiResponse> {
    const { id, ...updateData } = data
    const res = await api.put(`/private/category/${id}`, updateData)
    return res.data
}
