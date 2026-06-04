"use client"

import { AccountCard } from "@/components/modules/profile/layout/card/AccountCard";
import { PasswordManagerCard } from "@/components/modules/profile/layout/card/PasswordCard";
import { MenuSelector } from "@/components/modules/profile/layout/menu/MenuSelector";
import { useMenuStore } from "@/store/use-menu-store";

export default function ProfilePage() {
    const { menu } = useMenuStore()

    return (
        <main className="p-5 border border-slate-900/80 rounded-sm w-full h-full space-y-5">
            <header>
                <h1 className="text-2xl">Configurações</h1>
            </header>


            <section className="flex md:flex-row flex-col gap-1">
                <MenuSelector />

                <div className="w-full flex-1 h-full">
                    {menu === "account" && <AccountCard />}
                    {menu === "secury" && <PasswordManagerCard />}
                </div>
            </section>
        </main>
    )
}
