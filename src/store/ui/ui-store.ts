import { create } from "zustand";


export enum OperationType {
  SELL = 'SELL',
  RENT = 'RENT',
}

export function getOperationTypeColor(type: OperationType | null | undefined): string {
  return type ? OPERATION_TYPE_COLOR[type] : '';
}

export const OPERATION_TYPE_COLOR: Record<OperationType, string> = {
  [OperationType.SELL]: 'var(--color-buy)',
  [OperationType.RENT]: 'var(--color-rent)',
};



interface UIStoreState {
  isSidemenuOpen: boolean;
  operationType: OperationType | null;
  setOperationType: (type: OperationType) => void;
  clearOperationType: () => void;
  openSidemenu: () => void;
  closeSidemenu: () => void;
}

export const useUIStore = create<UIStoreState>()((set) => ({
  isSidemenuOpen: false,
  operationType: null,
  setOperationType: (type) => set({ operationType: type }),
  clearOperationType: () => set({ operationType: null }),
  openSidemenu: () => set({ isSidemenuOpen: true }),
  closeSidemenu: () => set({ isSidemenuOpen: false }),
}));
