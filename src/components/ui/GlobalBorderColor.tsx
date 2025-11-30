"use client";
import { useGlobalColor } from '@/context/GlobalColorContext';

export default function GlobalBorderColor() {
  const { color } = useGlobalColor();
  return (
    <>
      <div className="fixed top-0 right-0 z-10 w-full h-px" style={{ background: color }} />
      <div className="fixed bottom-0 right-0 z-10 w-full h-px" style={{ background: color }} />
    </>
  );
}
