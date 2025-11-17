
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';
import Link from "next/link";

export interface PropertyListItem {
  id: string | number;
  titel: string;
  adresse: string;
  agent: { name: string };
  preis: string;
  beschreibung: string;
  details: string;
  status: string;
}


function PropertyCard({ property, onDelete }: { property: PropertyListItem, onDelete: (id: string | number) => void }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-all duration-100">
      <td className="px-6 py-4 align-top">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {property.titel.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {property.titel}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{property.adresse}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 align-top">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {property.agent.name.charAt(0)}
          </div>
          <span className="text-xs text-black dark:text-white truncate">{property.agent.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 align-top">
        <span className="text-xs px-2 py-1 rounded bg-primary text-white font-semibold">{property.status}</span>
      </td>
      <td className="px-6 py-4 align-top">
        <span className="text-sm font-semibold text-primary">{property.preis}</span>
      </td>
      <td className="px-6 py-4 align-top w-[350px] max-w-[400px]">
        <div className={`text-xs text-gray-700 dark:text-gray-300 ${open ? '' : 'line-clamp-2'}`}>{property.beschreibung}</div>
        {open && property.details && (
          <div className="mt-2 text-xs text-variable-gray-700 dark:text-variable-gray-300 animate-fadeIn">
            {property.details}
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-right align-top min-w-[120px]">
        <div className="flex items-center justify-end gap-2">
          {property.id ? (
            <button
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
              title="Edit"
              onClick={() => router.push(`/admin/properties/${property.id}`)}
            >
              <IoCreateOutline className="text-lg" />
            </button>
          ) : (
            <span className="p-2 text-gray-400 cursor-not-allowed" title="ID fehlt">
              <IoCreateOutline className="text-lg" />
            </span>
          )}
          <button
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
            title="Delete"
            onClick={() => onDelete(property.id)}
          >
            <IoTrashOutline className="text-lg" />
          </button>
          <button
            className="text-xs bg-primary text-white rounded px-3 py-1 cursor-pointer hover:bg-primary-dark focus:outline-none whitespace-nowrap duration-100 ml-2"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Weniger anzeigen" : "Mehr anzeigen"}
          </button>
        </div>
      </td>
    </tr>
  );
}



export function PropertyList({ properties }: { properties: PropertyListItem[] }) {
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string>("");

  const handleDeleteClick = (id: string | number, titel: string) => {
    setDeleteId(id);
    setDeleteTitle(titel);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setLoadingDelete(true);
    setErrorDelete(null);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const res = await fetch(`http://localhost:3000/property/${deleteId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Fehler beim Löschen der Immobilie.');
      }
      window.location.reload();
    } catch (err: any) {
      setErrorDelete(err.message || 'Fehler beim Löschen der Immobilie.');
    } finally {
      setLoadingDelete(false);
      setDeleteId(null);
      setDeleteTitle("");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
    setDeleteTitle("");
  };

  return (
    <div className="mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Veröffentlichte Immobilien</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Verwalten Sie Ihre Immobilien</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
        >
          <span>Neue Immobilie erstellen</span>
        </Link>
      </div>
      {errorDelete && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-300 text-center font-semibold">
          {errorDelete}
        </div>
      )}
      <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Titel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Makler</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Preis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Beschreibung</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    Keine Immobilien gefunden.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <PropertyCard key={property.id} property={property} onDelete={() => handleDeleteClick(property.id, property.titel)} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 w-full max-w-md relative text-center">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={handleDeleteCancel}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Immobilie löschen</h2>
            <p className="mb-4">Möchten Sie wirklich die Immobilie <span className="font-semibold">{deleteTitle}</span> löschen?</p>
            {errorDelete && <div className="mb-2 text-red-600 font-semibold">{errorDelete}</div>}
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 rounded bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-200" onClick={handleDeleteCancel}>Abbrechen</button>
              <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={handleDeleteConfirm} disabled={loadingDelete}>
                {loadingDelete ? 'Lösche...' : 'Löschen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default function PropertiesPage() {
  const [properties, setProperties] = React.useState<PropertyListItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
        const res = await fetch('http://localhost:3000/property', {
          headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || 'Fehler beim Laden der Immobilien.');
        }
        const data = await res.json();

        const mapped = Array.isArray(data) ? data.map((item: any) => ({
          id: item.id,
          titel: item.title || item.titel || '',
          adresse: item.address_line || item.adresse || '',
          agent: { name: item.agent?.name || '' },
          preis: item.price_amount ? `${item.price_amount} €` : '',
          beschreibung: item.description || '',
          details: item.details || '',
          status: item.status || '',
        })) : [];
        setProperties(mapped);
      } catch (err: any) {
        setError(err.message || 'Fehler beim Laden der Immobilien.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) {
    return <div className="max-w-5xl mx-auto py-8 px-4 text-center text-primary font-semibold">Lade Immobilien...</div>;
  }
  if (error) {
    return <div className="max-w-5xl mx-auto py-8 px-4 text-center text-red-600 font-semibold">{error}</div>;
  }
  return <PropertyList properties={properties} />;
}
