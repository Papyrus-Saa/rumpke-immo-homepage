"use client";
import { useEffect } from 'react';
import { useGlobalColor } from '@/context/GlobalColorContext';

export default function KaufPage() {
  const { setColorType } = useGlobalColor();
  useEffect(() => {
    setColorType('buy');
    return () => setColorType('primary');
  }, [setColorType]);
  return (
    <div className="">
      <h1 className="text-white px-4 py-2 rounded">Hello Kauf page</h1>
    </div>
  );
}
