
'use client';


import React, { useState } from 'react';
import Image from 'next/image';

import { useUIStore } from '@/store/ui/ui-store';
import { PropertyFormValues } from '@/interfaces/propertyFormValues';
import { propertyExtraFields } from './propertyExtraFields';

interface PropertyCardProps {
  typ?: PropertyFormValues['type'];
  vorgang?: PropertyFormValues['operation'];
  title?: string;
  mainImage?: string;
  agentName?: string;
  agentPic?: string;
  adresse?: PropertyFormValues['address_line'];
  stadt?: PropertyFormValues['city'];
  plz?: PropertyFormValues['postal_code'];

  status?: PropertyFormValues['status'];
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  typ = "Apartment",
  vorgang = "miete",
  title = "Property title...",
  mainImage,
  agentName = "Agent's name...",
  agentPic,
  adresse = "Musterstraße 123",
  stadt = "Berlin",
  plz = "10115",
  status = 'SOLD',
}) => {
  const { label: statusLabel, colorVar: statusColor } = useStatusStore.getState().getStatusInfo(status);

  const [expanded, setExpanded] = useState(false);


  const extraFields = propertyExtraFields;

  return (
    <>
      <div
        className={`w-full mx-auto rounded shadow-sm overflow-hidden flex flex-col transition-shadow duration-200 bg-card-secondary-bg-l dark:bg-card-secondary-bg-d hover:shadow-lg`}
      >
        <div className="flex flex-row px-4 py-2 gap-8">

          <div className="flex flex-col border-r border-gray-300 dark:border-gray-700">
            <span className="text-sm text-gray-900 dark:text-white mb-2">{title}</span>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-20 h-20 rounded bg-gray-300 dark:bg-gray-700 flex items-center justify-center" />
              <div className="flex flex-col text-xs text-gray-700 dark:text-gray-300">
                <span>{adresse}</span>
                <span>{stadt}</span>
                <span>{plz}</span>
              </div>
            </div>
            <div className="mt-2 w-fit">
              <span
                className={`text-xs font-bold ${vorgang?.toLowerCase() === 'kauf' ? 'text-btn-buy' : vorgang?.toLowerCase() === 'miete' ? 'text-btn-rent' : 'text-gray-500 dark:text-gray-400'}`}
              >
                {vorgang?.toLowerCase() === 'kauf' ? 'Verkauf' : vorgang?.toLowerCase() === 'miete' ? 'Miete' : ''}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs text-gray-700 dark:text-gray-300 w-full items-center relative">
            <span>Typ: Apartment</span>
            <span>Wohnfläche: 85 m²</span>
            <span>Zimmer: 3</span>
            <span>Schlafzimmer: 2</span>
            <span>Badezimmer: 1</span>
            <span className="text-xs text-gray-900 dark:text-white font-bold col-span-2">Preis: €350.000</span>
            <div className="flex items-center gap-2 col-span-2">
              <div className="w-6 h-6 rounded-full bg-gray-400 dark:bg-gray-600" />
              <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Makler:</span>
              <span className="text-xs text-gray-700 dark:text-gray-300">John Doe</span>
            </div>

            <div className="absolute top-0 right-0">
              <span
                style={{ background: statusColor, color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.02em', display: 'inline-block' }}
              >
                {statusLabel}
              </span>
            </div>
            {/* Botón Mehr anzeigen... */}
            <div className="col-span-2 flex justify-end mt-2">
              <button
                type="button"
                className="text-xs text-btn-buy font-semibold px-3 py-1 rounded hover:underline cursor-pointer"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? 'Weniger anzeigen...' : 'Mehr anzeigen...'}
              </button>
            </div>

            {expanded && (
              <div className="col-span-2 mt-2 p-3 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {extraFields.map((field) => {
                    return (
                      <div key={field.key} className="flex flex-col text-xs">
                        <span className="font-semibold mb-1">{field.label}:</span>
                        <span>{field.value !== undefined ? String(field.value) : <span className="italic text-gray-400">(leer)</span>}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;

