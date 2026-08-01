import { api } from "@/lib/api"
import { ApiResponse } from "@/@types/api/api-response"

import { UserResponseType } from "../types"
import { DeleteUserSchemaType, UpdateUserSchemaType } from "../schemas/user-schema"

export async function getUser(): Promise<UserResponseType> {
    const { data } = await api.get("/private/me")
    return data.data
}

export async function updateUser(data: UpdateUserSchemaType): Promise<ApiResponse> {
    const res = await api.put("/private/me", data)
    return res.data
}

export async function deleteUser(password: DeleteUserSchemaType): Promise<ApiResponse> {
    const res = await api.delete("/private/me", { data: { password } })
    return res.data
}
