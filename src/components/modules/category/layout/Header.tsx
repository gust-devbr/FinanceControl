import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { useCategoryChart } from "@/hooks/use-category-chart";
import { formatCurrency } from "@/utils/formatCurrency";

export function HeaderCategory() {
    const { total, mostUsedCategory, isLoading } = useCategoryChart()

    return (
        <Card className="bg-slate-800 rounded-md text-white">
            <CardHeader>
                <CardTitle className="text-xl">Categorias</CardTitle>
                <CardDescription>
                    Gerencie suas categorias de gastos
                </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4 md:flex md:flex-row md:items-center md:gap-10">
                {isLoading
                    ? <Skeleton className={styles.cardInfo} />
                    : (
                        <Card className={styles.cardInfo}>
                            <p className="text-zinc-400">Gastos Totais</p>
                            <p className="text-2xl text-green-500">
                                {formatCurrency(total)}
                            </p>
                        </Card>
                    )}

                {isLoading
                    ? <Skeleton className={styles.cardInfo} />
                    : (
                        <Card className={styles.cardInfo}>
                            <p className="text-zinc-400">Mais Usada</p>
                            <p className="text-2xl" style={{ color: mostUsedCategory?.color }}>
                                {mostUsedCategory?.name}
                            </p>
                            <p className="text-zinc-400">{mostUsedCategory?.count} gastos</p>
                        </Card>
                    )}
            </CardContent>
        </Card>
    )
}

const styles = {
    cardInfo: "md:max-w-[50%] md:flex-1 bg-slate-700 px-5 min-h-35",
}