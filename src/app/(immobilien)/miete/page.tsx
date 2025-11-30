"use client";
import { useEffect } from 'react';
import { useGlobalColor } from '@/context/GlobalColorContext';

export default function MietePage() {
  const { setColorType } = useGlobalColor();
  useEffect(() => {
    setColorType('rent');
    return () => setColorType('primary');
  }, [setColorType]);
  return (
    <div className="">
      <h1>Hello Miete Page</h1>
    </div>
  );
}
