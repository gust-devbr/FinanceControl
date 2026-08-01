import { create } from "zustand"

export type MenuTypes = "account"

type MenuStory = {
    menu: MenuTypes
    setMenu: (value: MenuTypes) => void
}

export const useMenuStore = create<MenuStory>(set => ({
    menu: "account",
    setMenu: (value) => set({ menu: value })
}))
