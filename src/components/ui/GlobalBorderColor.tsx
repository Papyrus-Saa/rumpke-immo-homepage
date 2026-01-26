"use client";
import { useBorderColor } from '@/hooks/useBorderColor';

export default function GlobalBorderColor() {
  const color = useBorderColor();
  return (
    <>
      <div className="fixed top-0 right-0 z-20 w-full h-1" style={{ background: color }} />
      <div className="fixed bottom-0 right-0 z-20 w-full h-1" style={{ background: color }} />
    </>
  );
}
