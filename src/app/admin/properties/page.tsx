
"use client";
import React, { useState } from "react";
import Link from "next/link";

// PropertyList Komponente: dynamisch, wiederverwendbar, alle Texte auf Deutsch
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

function PropertyCard({ property }: { property: PropertyListItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-[90%] mx-auto bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow-sm p-3 mb-4 transition-all duration-100">
      <div className="flex items-center gap-4 min-h-[60px]">
        {/* Avatar Immobilie */}
        <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {property.titel.charAt(0)}
        </div>
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs px-2 py-1 rounded bg-variable-primary text-variable-white font-semibold">{property.status}</span>
            <span className="text-base font-bold text-variable-black dark:text-variable-white truncate">{property.titel}</span>
          </div>
          <div className="text-xs text-variable-gray-600 dark:text-variable-gray-400 mb-1 truncate">{property.adresse}</div>
          <div className="flex items-center gap-1 mb-1">
            {/* Avatar Agent */}
            <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {property.agent.name.charAt(0)}
            </div>
            <span className="text-xs text-variable-black dark:text-variable-white truncate">{property.agent.name}</span>
          </div>
          <div className="text-sm font-semibold text-variable-primary mb-1">{property.preis}</div>
          <div className="text-xs text-variable-gray-700 dark:text-variable-gray-300 line-clamp-1">{property.beschreibung}</div>
        </div>
        <button
          className="ml-2 text-xs bg-variable-primary text-variable-white rounded px-3 py-1 cursor-pointer hover:bg-variable-primary-dark focus:outline-none whitespace-nowrap duration-100"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Weniger anzeigen" : "Mehr anzeigen"}
        </button>
      </div>
      {open && (
        <div className="mt-2 text-xs text-variable-gray-700 dark:text-variable-gray-300 animate-fadeIn">
          {property.details}
        </div>
      )}
    </div>
  );
}


export function PropertyList({ properties }: { properties: PropertyListItem[] }) {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-variable-black dark:text-variable-white">Veröffentlichte Immobilien</h1>
        <Link
          href="/admin/properties/new"
          className="px-5 py-2 rounded-lg bg-variable-primary text-variable-white font-semibold hover:bg-variable-primary-dark transition cursor-pointer duration-100"
        >
          Neue Immobilie erstellen
        </Link>
      </div>
      <div>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

// Default export für Next.js Page
const DUMMY_PROPERTIES: PropertyListItem[] = [];

export default function PropertiesPage() {
  return <PropertyList properties={DUMMY_PROPERTIES} />;
}
