'use client';


import { PropertyAdminPanel } from "@/interfaces/PropertyAdminPanel";
import { useRouter } from "next/navigation";
import { IoAddOutline } from "react-icons/io5";
import { useUIStore, OperationType, getOperationTypeColor } from "@/store/ui/ui-store";
import Button from "@/components/ui/Button";
import PropertiesAdminGrid from "../components/properties/components/PropertiesAdminGrid";
import { useEffect, useState } from "react";
import { getProperties } from "@/utils/admin-client";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyAdminPanel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      setError("");
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err: any) {
        setError(err.message || "Unbekannter Fehler");
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const router = useRouter();
  const setOperationType = useUIStore(s => s.setOperationType);

  const handleCreate = (type: OperationType) => {
    setOperationType(type);
    router.push("/admin/properties/new");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4">Immobilien</h1>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="primary"
            onClick={() => handleCreate(OperationType.SELL)}
            className="mb-4 text-xs font-semibold transition-colors flex items-center gap-2 bg-white dark:bg-neutral-900"
            style={{ minWidth: 80, borderLeft: `4px solid ${getOperationTypeColor(OperationType.SELL)}` }}
          >
            <IoAddOutline className="text-base" />
            Kauf
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => handleCreate(OperationType.RENT)}
            className="mb-4 text-xs font-semibold transition-colors flex items-center gap-2 bg-white dark:bg-neutral-900"
            style={{ minWidth: 80, borderLeft: `4px solid ${getOperationTypeColor(OperationType.RENT)}` }}
          >
            <IoAddOutline className="text-base" />
            Miete
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8">Lade Immobilien...</div>
      ) : error ? (
        <div className="text-center text-error py-8">{error}</div>
      ) : (
        <PropertiesAdminGrid properties={properties} />
      )}
    </div>
  );
}


