import type { CreateFinanceType, UpdateFinanceType } from "./schemas"
import { apiFetch } from "next-lib-utils"
import { Finance } from "./types"

export async function getFinances() {
    const res = await apiFetch("/private/finance")
    const finances: Finance[] = res?.data?.finances
    return finances
}

export async function createFinance(data: CreateFinanceType) {
    return await apiFetch("/private/finance", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function deleteFinance(id: string) {
    await apiFetch(`/private/finance/${id}/delete`, {
        method: "DELETE"
    })
}

export async function updateFinance({
    id,
    name,
    amount,
    categoryId
}: UpdateFinanceType) {
    return await apiFetch(`/private/finance/${id}/edit`, {
        method: "PUT",
        body: JSON.stringify({ name, amount, categoryId })
    })
}
