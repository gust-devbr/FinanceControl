import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import type { CreateFinanceType, UpdateFinanceType } from "./schemas"

import {
    getFinances,
    createFinance,
    updateFinance,
    deleteFinance
} from "./api"

export function useFinance() {
    return useQuery({
        queryKey: ['finance'],
        queryFn: async () => await getFinances()
    })
}

export function useCreateFinance() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: CreateFinanceType) => await createFinance(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['finance']
            })
        }
    })
}

export function useUpdateFinance() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: UpdateFinanceType) => await updateFinance(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['finance']
            })
        }
    })
}

export function useDeleteFinance() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => await deleteFinance(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['finance']
            })
        }
    })
}
