import { create } from "zustand";




type BarBgColor = 'bg-primary' | 'bg-btn-buy' | 'bg-btn-rent';

export interface State {
  isSidemenuOpen: boolean;
  barBgColor: BarBgColor;
  setBarBgColor: (color: BarBgColor) => void;
  openSidemenu: () => void;
  closeSidemenu: () => void;
}


export const useUIStore = create<State>()((set) => ({
  isSidemenuOpen: false,
  barBgColor: 'bg-primary',
  setBarBgColor: (color) => set({ barBgColor: color }),
  openSidemenu: () => set({ isSidemenuOpen: true }),
  closeSidemenu: () => set({ isSidemenuOpen: false }),
}));
