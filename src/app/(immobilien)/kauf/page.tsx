'use client';

import { useUIStore, OperationType } from '@/store/ui/ui-store';
import { useEffect } from 'react';

export default function KaufPage() {
  const { setOperationType, clearOperationType } = useUIStore();
  useEffect(() => {
    setOperationType(OperationType.SELL);
    return () => clearOperationType();
  }, [setOperationType, clearOperationType]);
  return (
    <div className="">
      <h1 className="text-white px-4 py-2 rounded">Hello Kauf page</h1>
    </div>
  );
}
