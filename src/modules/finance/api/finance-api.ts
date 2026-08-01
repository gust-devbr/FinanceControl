import { api } from "@/lib/api"

import { FinanceResponse } from "../types"
import { ApiResponse } from "@/@types/api/api-response"

import type * as DTO from "../schemas/finance-schema"

export async function getFinances(): Promise<FinanceResponse> {
    const { data } = await api.get("/private/finance")
    return data
}

export async function createFinance(data: DTO.CreateFinanceSchemaType): Promise<ApiResponse> {
    const res = await api.post("/private/finance", data)
    return res.data
}

export async function deleteFinance(id: string): Promise<ApiResponse> {
    const res = await api.delete(`/private/finance/${id}`)
    return res.data
}

export async function updateFinance(
    data: DTO.UpdateFinanceSchemaType & { id: string }
): Promise<ApiResponse> {
    const { id, ...rest } = data
    const res = await api.put(`/private/finance/${id}`, rest)
    return res.data
}
