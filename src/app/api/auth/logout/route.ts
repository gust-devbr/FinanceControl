import { Response } from "next-lib-utils";

export async function POST() {
    const res = Response.success(null, "Logout feito com sucesso")
    res.cookies.delete("token")
    return res
}