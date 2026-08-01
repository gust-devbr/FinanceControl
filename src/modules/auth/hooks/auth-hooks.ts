import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

import * as api from "../api/api";

export function useLogin() {
    const router = useRouter()
    return useMutation({
        mutationFn: api.login,
        onSuccess: () => router.refresh()
    })
}

export function useRegister() {
    const router = useRouter()
    return useMutation({
        mutationFn: api.register,
        onSuccess: () => router.refresh()
    })
}

export function useLogout() {
    const router = useRouter()
    return useMutation({
        mutationFn: api.logout,
        onSuccess: () => {
            queryClient.clear()
            router.refresh()
        }
    })
}