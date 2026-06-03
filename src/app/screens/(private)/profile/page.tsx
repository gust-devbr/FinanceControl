import { AccountCard } from "@/components/modules/profile/layout/AccountCard";
import { PasswordManagerCard } from "@/components/modules/profile/layout/PasswordCard";

export default function ProfilePage() {
    return (
        <main className="p-5 border border-slate-900/80 rounded-sm w-full h-full space-y-5">
            <header>
                <h1 className="text-2xl">Meu Perfil</h1>
            </header>

            <section className="space-y-5">
                <AccountCard />
                <PasswordManagerCard />
            </section>
        </main>
    )
}
