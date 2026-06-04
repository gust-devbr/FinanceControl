"use client"

import {
    Sidebar,
    useSidebar,
    SidebarMenu,
    SidebarGroup,
    SidebarContent,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
    Cog,
    Wallet,
    LogOut,
    LucideIcon,
    BringToFront,
} from "lucide-react"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

import { useLogout } from "@/modules/auth/hooks"

type Routes = {
    name: string
    href: string
    icon: LucideIcon
}

export function AppSidebar() {
    const logout = useLogout()
    const router = useRouter()
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"

    async function handleLogout() {
        await logout.mutateAsync()
        router.replace("/screens/login")
    }

    const pathname = usePathname()

    const routes: Routes[] = [
        { name: "Finanças", href: "/screens/home", icon: Wallet },
        { name: "Categorias", href: "/screens/category", icon: BringToFront },
        { name: "Configurações", href: "/screens/settings", icon: Cog },
    ]

    return (
        <Sidebar collapsible="icon">
            <SidebarContent className="bg-slate-950 text-white">
                <SidebarGroup className="space-y-5 mt-4">
                    <div className="flex flex-row items-center gap-3">
                        {!isCollapsed && <span className="text-xl font-medium">Controle Financeiro</span>}
                    </div>

                    <Separator />

                    <SidebarMenu className="space-y-2">
                        {routes.map(route => {
                            const Icon = route.icon
                            const isActive = pathname.startsWith(route.href)

                            return (
                                <SidebarMenuItem key={route.href}>
                                    {(route.href === "/screens/settings" && !isCollapsed) && (
                                        <div className="my-2">
                                            <Separator />
                                        </div>
                                    )}
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        tooltip={route.name}
                                        className={cn(
                                            "py-3",
                                            isActive && "bg-blue-100 text-blue-600 font-medium hover:bg-blue-100 hover:text-blue-600"
                                        )}
                                    >

                                        <Link href={route.href} className="flex items-center gap-3 w-full">
                                            <Icon className={cn(
                                                "shrink-0",
                                                isCollapsed ? "w-4! h-4!" : "w-5! h-5!",
                                                isActive ? "text-blue-600" : "text-muted-foreground"
                                            )} />
                                            <span className={cn(
                                                "text-[16px]",
                                                !isActive && "text-muted-foreground"
                                            )}>
                                                {route.name}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}

                        <SidebarMenuItem className="rounded-sm">
                            <SidebarMenuButton
                                tooltip="Sair"
                                onClick={handleLogout}
                                className="py-3 text-red-800 hover:text-red-700"
                            >
                                <LogOut className={cn(
                                    isCollapsed ? "w-4! h-4!" : "w-5! h-5!",
                                )}
                                />
                                Sair
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
