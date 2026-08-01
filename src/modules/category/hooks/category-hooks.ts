import { useQuery } from "@tanstack/react-query";
import { useAppMutation } from "@/hooks/use-app-mutation";

import { queryClient } from "@/lib/query-client";
import { QUERY_KEYS } from "@/lib/query-keys";

import * as api from "../api/category-api"

const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.category] })

export function useCategory() {
    return useQuery({
        queryKey: [QUERY_KEYS.category],
        queryFn: api.getCategories
    })
}

export function useCreateCategory() {
    return useAppMutation(api.createCategory, { onSuccess })
}

export function useUpdateCategory() {
    return useAppMutation(api.updateCategory, { onSuccess })
}

export function useDeleteCategory() {
    return useAppMutation(api.deleteCategory, { onSuccess })
}
