import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <TooltipProvider>
                <SidebarProvider>
                    <div className="flex min-h-screen w-full">
                        <AppSidebar />
                        <SidebarInset>
                            <main className="h-full bg-slate-950 text-white">
                                <SidebarTrigger />
                                {children}
                            </main>
                        </SidebarInset>
                    </div>
                </SidebarProvider>
            </TooltipProvider>
        </>
    )
}
