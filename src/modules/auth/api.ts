import type {
    RegisterSchemaType,
    LoginSchemaType,
    UpdateUserType,
    DeleteUserType
} from "./schemas";
import { apiFetch } from "next-lib-utils";
import { User } from "./types";

export async function getUser() {
    const res = await apiFetch("/private/user/me")
    const user: Omit<User, 'password'> = res?.data.user
    return user
}

export async function updateUser(data: UpdateUserType) {
    return await apiFetch("/private/user/profile/update", {
        method: "PUT",
        body: JSON.stringify(data)
    })
}

export async function deleteUser(password: DeleteUserType) {
    return await apiFetch("/private/user/profile/delete", {
        method: "DELETE",
        body: JSON.stringify({ password })
    })
}

export async function login(data: LoginSchemaType) {
    return await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function register(data: RegisterSchemaType) {
    return await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export async function logout() {
    await apiFetch("/auth/logout", { method: "POST" })
}
