import { create } from 'zustand'

const globalStore = create((set) => ({
    curPage: "index",
    setCurPage: (newPage) => set((state) => ({ curPage: newPage })),
}))

export default globalStore;