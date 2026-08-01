import {
    Pie,
    Tooltip,
    PieChart,
    ResponsiveContainer,
} from "recharts"
import { useCategoryChart } from "@/hooks/use-category-chart"
import { Card, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function FinanceChart() {
    const { chartData, total, isLoading } = useCategoryChart()

    return (
        <>
            {isLoading
                ? <Skeleton className="border-slate-700 bg-slate-700 p-4 w-full" />
                : (
                    <Card className="border-slate-700 bg-slate-800 p-4 w-full">
                        <CardTitle className="text-white text-xl font-semibold mb-6">
                            Gráfico de Gastos por Categoria
                        </CardTitle>

                        <div className="flex flex-col items-center gap-4">
                            <div className="w-full h-75">
                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={50}
                                            outerRadius={80}
                                            label={({ percent }) =>
                                                `${((percent ?? 0) * 100).toFixed(1)}%`
                                            }
                                            labelLine={false}
                                        >
                                        </Pie>

                                        <text
                                            x="50%"
                                            y="50%"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x="50%"
                                                dy="-8"
                                                className="fill-zinc-400 text-sm"
                                            >
                                                Total
                                            </tspan>

                                            <tspan
                                                x="50%"
                                                dy="24"
                                                className="fill-white text-xl font-bold"
                                            >
                                                R$ {total.toLocaleString("pt-BR")}
                                            </tspan>
                                        </text>

                                        <Tooltip
                                            formatter={value => [
                                                `R$ ${value}`,
                                                "Valor",
                                            ]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>
                )}
        </>
    )
}
