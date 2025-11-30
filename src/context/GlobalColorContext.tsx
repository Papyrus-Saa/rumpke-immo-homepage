"use client";
import React, { createContext, ReactNode, useContext, useState, } from 'react';


const RENT_COLOR = 'var(--color-rent)';
const BUY_COLOR = 'var(--color-buy)';
const PRIMARY_COLOR = 'var(--color-primary)';

export type GlobalColorType = 'primary' | 'rent' | 'buy' | '';

interface GlobalColorContextValue {
  colorType: GlobalColorType;
  color: string;
  setColorType: (type: GlobalColorType) => void;
}

const GlobalColorContext = createContext<GlobalColorContextValue | undefined>(undefined);

export const GlobalColorProvider = ({ children }: { children: ReactNode }) => {
  const [colorType, setColorType] = useState<GlobalColorType>('primary');

  let color = '';
  if (colorType === 'primary' || colorType === '') color = PRIMARY_COLOR;
  if (colorType === 'rent') color = RENT_COLOR;
  if (colorType === 'buy') color = BUY_COLOR;

  return (
    <GlobalColorContext.Provider value={{ colorType, color, setColorType }}>
      {children}
    </GlobalColorContext.Provider>
  );
};

export function useGlobalColor() {
  const context = useContext(GlobalColorContext);
  if (!context) {
    throw new Error('useGlobalColor muss innerhalb von GlobalColorProvider verwendet werden');
  }
  return context;
}
