import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

import type { CreateCategoryType, UpdateCategoryType } from "./schemas"

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "./api"

export function useCategory() {
    return useQuery({
        queryKey: ['category'],
        queryFn: async () => await getCategories()
    })
}

export function useCreateCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: CreateCategoryType) => await createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
        }
    })
}

export function useUpdateCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: UpdateCategoryType) => await updateCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
        }
    })
}

export function useDeleteCategory() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => await deleteCategory(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
        }
    })
}
