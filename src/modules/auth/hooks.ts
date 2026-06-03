import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
    RegisterSchemaType,
    LoginSchemaType,
    DeleteUserType,
    UpdateUserType
} from "./schemas";

import {
    deleteUser,
    login,
    logout,
    register,
    updateUser,
    getUser,
} from "./api";

export function useUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => await getUser()
    })
}

export function useLogin() {
    return useMutation({
        mutationFn: async (data: LoginSchemaType) => {
            return await login(data)
        }
    })
}

export function useRegister() {
    return useMutation({
        mutationFn: async (data: RegisterSchemaType) => {
            return await register(data)
        }
    })
}

export function useLogout() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => await logout(),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}

export function useDeleteUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: DeleteUserType) => await deleteUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}

export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: UpdateUserType) => await updateUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    })
}
