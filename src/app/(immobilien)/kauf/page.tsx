"use client";

import { useEffect } from 'react';
import { useUIStore } from '@/store/ui/ui-store';

export default function () {
  const setBarBgColor = useUIStore((state) => state.setBarBgColor);
  useEffect(() => {
    setBarBgColor('bg-btn-buy');
    return () => setBarBgColor('bg-primary');
  }, [setBarBgColor]);
  return (
    <div className="">
      <h1>Hello Kauf page</h1>
    </div>
  );
}
