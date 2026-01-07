'use client';


import { PropertyAdminPanel } from "@/interfaces/PropertyAdminPanel";
import Link from "next/link";
import { IoHomeOutline, IoAddOutline } from "react-icons/io5";
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

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Immobilien</h1>
        <Link href="/admin/properties/new" className="mb-4 text-primary hover:underline text-xs flex items-center justify-center dark:bg-card-bg-d bg-card-bg-l dark:hover:bg-Bghover-d hover:bg-Bghover-l px-3 py-2 rounded-md">
          <span className="flex items-center gap-1">
            <IoAddOutline className="text-base" />
            <IoHomeOutline className="text-base" />
          </span>
        </Link>
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


