import React from 'react';
import Image from 'next/image';
import { OperationType } from '@/store/ui/ui-store';
import PropertyTypeCorner from './PropertyTypeCorner';

interface PropertyCardProps {
  id: string;
  slug: string;
  title: string;
  image: string;
  price?: string;
  operationType: OperationType;
  city?: string;
  postal_code?: string;
  rooms?: number;
  built_area_m2?: string | number | null;
  plot_area_m2?: string | number | null;
  available_from?: string;
  deposit?: string | number | null;
  furnished?: string | null;
}

const PropertyCard: React.FC<{ property: PropertyCardProps }> = ({ property }) => {
  return (
    <div className="relative cursor-pointer bg-white dark:bg-card-bg-d border border-transparent dark:border-admin-border-d rounded shadow hover:shadow-lg transition overflow-hidden group">
      <PropertyTypeCorner type={property.operationType} style={{ top: 8, left: 8 }} size={8} />
      <div className="relative w-full h-40">
        {property.image ? (
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center w-full h-full bg-gray-200 dark:bg-card-secondary-bg-d text-gray-500 dark:text-card-text-d"
          >
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10.75L12 4l9 6.75M4.5 10.75V19a1 1 0 001 1h13a1 1 0 001-1v-8.25M9 21V12h6v9" />
            </svg>
            <span className="text-xs font-medium">Bild nicht verfügbar</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="font-bold text-lg mb-1" title={property.title}>{property.title}</div>
        <div className="text-sm text-card-text-l dark:text-card-text-d mb-1">
          {property.city && <span>{property.city}</span>}
          {property.postal_code && <span>{property.city ? ', ' : ''}{property.postal_code}</span>}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-card-text-l dark:text-card-text-d mb-1">
          {property.rooms !== undefined && property.rooms !== null && (
            <span>Zimmer: <b>{property.rooms}</b></span>
          )}
          {property.built_area_m2 && (
            <span>Wohnfläche: <b>ca. {Number(property.built_area_m2).toLocaleString('de-DE')} m²</b></span>
          )}
          {property.plot_area_m2 && (
            <span>Grundstück: <b>ca. {Number(property.plot_area_m2).toLocaleString('de-DE')} m²</b></span>
          )}
        </div>
        {property.price && <div className="text-primary font-semibold mb-1">{property.price}</div>}


        {property.operationType === OperationType.RENT && (
          <div className="flex flex-col gap-1 mt-2 text-xs">
            {property.available_from && (
              <div><b>Verfügbar ab:</b> {new Date(property.available_from).toLocaleDateString('de-DE')}</div>
            )}
            {property.deposit && (
              <div><b>Kaution:</b> {property.deposit}</div>
            )}
            {property.furnished && property.furnished.toLowerCase() !== 'nein' && property.furnished.toLowerCase() !== 'no' && (
              <div><b>Möbliert</b></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
