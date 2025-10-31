import { create } from "zustand";


interface State {
  isSidemenuOpen: boolean;

  openSidemenu: () => void;
  closeSidemenu: () => void;
}


export const useUIStore = create<State>()((set) => ({
  isSidemenuOpen: false,


  openSidemenu: () => set({ isSidemenuOpen: true }),
  closeSidemenu: () => set({ isSidemenuOpen: false }),
}));
