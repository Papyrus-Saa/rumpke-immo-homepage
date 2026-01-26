"use client";
import { useEffect } from 'react';
import { useUIStore, OperationType } from '@/store/ui/ui-store';

export default function MietePage() {
  const { setOperationType, clearOperationType } = useUIStore();
  useEffect(() => {
    setOperationType(OperationType.RENT);
    return () => clearOperationType();
  }, [setOperationType, clearOperationType]);
  return (
    <div className="">
      <h1>Hello Miete Page</h1>
    </div>
  );
}
