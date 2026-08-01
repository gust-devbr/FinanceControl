import { create } from "zustand";

type ModalName = "editCategory"

import { Category } from "@prisma/client";

interface ModalStore {
    modals: Partial<Record<ModalName, boolean>>;
    selectedCategory: Category | null;

    openEditCategory: (task: Category) => void;
    closeEditCategory: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    modals: {},
    selectedCategory: null,

    openEditCategory: (task) =>
        set({
            selectedCategory: task,
            modals: {
                editCategory: true,
            },
        }),

    closeEditCategory: () =>
        set({
            selectedCategory: null,
            modals: {
                editCategory: false,
            },
        }),
}));