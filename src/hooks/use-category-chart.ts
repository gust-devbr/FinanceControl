import { useMemo } from "react"

import { useCategory } from "@/modules/category/hooks/category-hooks"
import { useFinance } from "@/modules/finance/hooks/finance-hooks"

export function useCategoryChart() {
    const categories = useCategory()
    const finances = useFinance()

    const chartData = useMemo(() => {
        if (!categories.data || !finances.data)
            return []

        const financeMap = finances?.data?.finances?.reduce(
            (acc, finance) => {
                acc[finance.categoryId] =
                    (acc[finance.categoryId] || 0) +
                    finance.amount

                return acc
            },
            {} as Record<string, number>
        )

        return categories?.data?.map(category => ({
            name: category.name,
            fill: category.color,
            value: financeMap[category.id] || 0,
        }))
    }, [categories.data, finances.data])

    const biggestExpense = useMemo(() => {
        const financesData = finances?.data?.finances ?? []

        if (!financesData.length) return null

        return financesData?.reduce((max, finance) =>
            finance.amount > max.amount
                ? finance
                : max
        )
    }, [finances])

    const mostUsedCategory = useMemo(() => {
        if (!finances.data) return null

        const categories = Object?.values(
            finances?.data?.finances?.reduce((acc, finance) => {
                if (!finance.category) return acc

                const { id, name, color } = finance.category

                acc[id] ??= {
                    id,
                    name,
                    color,
                    count: 0,
                }

                acc[id].count++

                return acc
            }, {} as Record<string, {
                id: string
                name: string
                color: string
                count: number
            }>) ?? {}
        )

        return categories.sort((a, b) => b.count - a.count)[0]
    }, [finances])

    const total = chartData?.reduce((sum, item) => sum + item.value, 0)

    return {
        chartData,
        biggestExpense,
        mostUsedCategory,
        total,
        isLoading:
            categories.isLoading ||
            finances.isLoading,
        isError:
            categories.isError ||
            finances.isError,
    }
}