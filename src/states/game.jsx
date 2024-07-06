import { create } from 'zustand'

const gameStore = create((set) => ({
    curTarget: "index",
    curOutfit: "index",
    setCurTarget: (newPerson) => set((state) => ({ curTarget: newPerson })),
    setCurOutfit: (newOutfit) => set((state) => ({ curOutfit: newOutfit })),
}))

export default gameStore;