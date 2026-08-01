import { api } from "@/lib/api";
import type { LoginSchemaType, RegisterSchemaType } from "../schemas/auth-schema";

import { ApiResponse } from "@/@types/api/api-response";

export async function login(data: LoginSchemaType): Promise<ApiResponse> {
    const res = await api.post("/auth/login", data)
    return res.data
}

export async function register(data: RegisterSchemaType): Promise<ApiResponse> {
    const res = await api.post("/auth/register", data)
    return res.data
}

export async function logout(): Promise<ApiResponse> {
    const res = await api.post("/auth/logout")
    return res.data
}
