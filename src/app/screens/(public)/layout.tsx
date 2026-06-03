import { getToken } from "@/utils/auth"
import { redirect } from "next/navigation"

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    const token = await getToken()

    if (token) {
        redirect("/screens/home")
    }

    return <>{children}</>
}