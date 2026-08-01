import { create } from "zustand";

type ModalName =
    | "editFinance"
    | "deleteFinance";

import { Finance } from "@prisma/client";

interface ModalStore {
    modals: Partial<Record<ModalName, boolean>>;
    selectedFinance: Finance | null;

    openEditFinance: (task: Finance) => void;
    closeEditFinance: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    modals: {},
    selectedFinance: null,

    openEditFinance: (task) =>
        set({
            selectedFinance: task,
            modals: {
                editFinance: true,
            },
        }),

    closeEditFinance: () =>
        set({
            selectedFinance: null,
            modals: {
                editFinance: false,
            },
        }),
}));