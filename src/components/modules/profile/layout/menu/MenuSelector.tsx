"use client"

import { useMenuStore, MenuTypes } from "@/store/use-menu-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Lock, LucideIcon, UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function MenuSelector() {
    const { menu, setMenu } = useMenuStore()

    type MenuList = {
        value: MenuTypes,
        title: string
        Icon: LucideIcon,
        description: string
    }

    const menuList: MenuList[] = [
        {
            Icon: UserIcon,
            title: "Minha Conta",
            value: "account",
            description: "Dados pessoais"
        },
        {
            Icon: Lock,
            title: "Segurança",
            value: "secury",
            description: "Senha"
        },
    ]

    return (
        <Card className="flex-1 md:max-w-[20%] bg-slate-800 text-white">
            <CardHeader>
                <CardTitle className="text-xl">Menu</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                {menuList.map(m => (
                    <div
                        key={m.value}
                        onClick={() => setMenu(m.value)}
                        className={cn(
                            "w-full rounded-lg transition-all duration-200",
                            "flex flex-row items-center gap-2 h-13 p-2",
                            m.value === menu
                                ? "bg-green-500/10 hover:bg-green-300/30"
                                : "bg-transparent hover:bg-slate-700"
                        )}
                    >
                        {<m.Icon className="text-emerald-400 w-7! h-7!" />}

                        <div>
                            <p className="text-[18px]">{m.title}</p>
                            <p className="text-zinc-400 text-[13px]">{m.description}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
