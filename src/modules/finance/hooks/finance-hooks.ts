import { useQuery } from "@tanstack/react-query";
import { useAppMutation } from "@/hooks/use-app-mutation";

import { QUERY_KEYS } from "@/lib/query-keys";
import { queryClient } from "@/lib/query-client";

import * as api from "../api/finance-api"
import { FinanceQuery } from "../types";

const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.finance] })

export function useFinance(query?: FinanceQuery) {
    return useQuery({
        queryKey: [QUERY_KEYS.finance, query],
        queryFn: () => api.getFinances(query as FinanceQuery),
    })
}

export function useCreateFinance() {
    return useAppMutation(api.createFinance, { onSuccess })
}

export function useUpdateFinance() {
    return useAppMutation(api.updateFinance, { onSuccess })
}

export function useDeleteFinance() {
    return useAppMutation(api.deleteFinance, { onSuccess })
}
