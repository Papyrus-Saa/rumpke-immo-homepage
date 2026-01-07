"use client";


import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import { getPropertyById } from "@/utils/admin-client";

export default function EditPropertyPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    getPropertyById(id)
      .then(data => setProperty(data))
      .catch(err => setError(err.message || "Error al cargar la vivienda"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-2 hover:text-primary mb-4 text-xs text-primary hover:underline"
        >
          <IoArrowBackOutline />
          <span>Zurück zur Immobilienübersicht</span>
        </Link>
        <h1 className="text-2xl font-bold text-admin-text-l dark:text-admin-text-d">Immobilie bearbeiten</h1>
        <p className="text-sm text-admin-text-l dark:text-admin-text-d mt-1">
          Bearbeiten Sie die Daten der ausgewählten Immobilie
        </p>
      </div>
      <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6 border border-admin-border-l dark:border-admin-border-d min-h-[200px] flex items-center justify-center">
        {loading ? (
          <span className="text-admin-text-l dark:text-admin-text-d">Lade Immobiliendaten...</span>
        ) : error ? (
          <span className="text-error text-center">{error}</span>
        ) : !property ? (
          <span className="text-admin-text-l dark:text-admin-text-d">Immobilie nicht gefunden.</span>
        ) : (
          <span className="text-admin-text-l dark:text-admin-text-d">Daten geladen. Hier folgt das Bearbeitungsformular.</span>
        )}
      </div>
    </div>
  );
}
