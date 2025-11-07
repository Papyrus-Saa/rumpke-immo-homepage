"use client";
import { useUIStore } from '@/store/ui/ui-store';

export function BorderBars() {
  const barBgColor = useUIStore((state) => state.barBgColor);
  return (
    <>
      <div className={`w-full h-px fixed top-0 left-0 z-10 ${barBgColor}`} />
      <div className={`w-full h-px fixed bottom-0 left-0 z-10 ${barBgColor}`} />
    </>
  );
}
