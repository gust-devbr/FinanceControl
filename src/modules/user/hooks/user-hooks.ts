import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { useRouter } from "next/navigation";

import { QUERY_KEYS } from "@/lib/query-keys";

import * as api from "../api/user-api"

export function useUser() {
    return useQuery({
        queryKey: [QUERY_KEYS.user],
        queryFn: api.getUser
    })
}

export function useUpdateUser() {
    return useMutation({
        mutationFn: api.updateUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] })
    })
}

export function useDeleteUser() {
    const router = useRouter()
    return useMutation({
        mutationFn: api.deleteUser,
        onSuccess: () => {
            queryClient.clear()
            router.refresh()
        }
    })
}