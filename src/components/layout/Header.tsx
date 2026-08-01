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

export function HeaderHome() {
    const { total, biggestExpense, isLoading } = useCategoryChart()

    return (
        <Card className="bg-slate-800 rounded-md text-white">
            <CardHeader>
                <CardTitle className="text-xl">Controle Financeiro</CardTitle>
                <CardDescription>
                    Controle suas finanças e gerencia seu gastos em dia
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
                            <p className="text-zinc-400">Maior Gasto</p>
                            <p className="text-2xl" style={{ color: biggestExpense?.category?.color, }}>
                                {biggestExpense?.amount &&
                                    formatCurrency(biggestExpense?.amount)
                                }
                            </p>
                            {biggestExpense && (
                                <Badge style={{
                                    backgroundColor: biggestExpense?.category?.color,
                                }}>
                                    {biggestExpense?.category?.name}
                                </Badge>
                            )}
                        </Card>
                    )}
            </CardContent>
        </Card>
    )
}

const styles = {
    cardInfo: "md:max-w-[50%] md:flex-1 bg-slate-700 px-5 min-h-35",
}