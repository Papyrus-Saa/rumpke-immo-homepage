import React from 'react';
import Image from 'next/image';
import { OperationType } from '@/store/ui/ui-store';
import PropertyTypeCorner from './PropertyTypeCorner';

type PropertyStatus = 'PUBLISHED' | 'RESERVED' | 'SOLD' | 'RENTED' | 'DRAFT' | 'HIDDEN';

type PropertyData = {
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
  status?: PropertyStatus;
  available_from?: string;
  deposit?: string | number | null;
  furnished?: string | null;
};

interface PropertyCardProps {
  property: PropertyData;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  style?: React.CSSProperties;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick, className, style }) => {

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Card click:', property);
    if (onClick) onClick(e);
  };

  let statusLabel = '';
  let statusColor = '';
  let cardOpacity = '';
  switch (property.status) {
    case 'RESERVED':
      statusLabel = 'Reserviert';
      statusColor = 'var(--color-status-reserved)';
      cardOpacity = 'opacity-60';
      break;
    case 'SOLD':
      statusLabel = 'Verkauft';
      statusColor = 'var(--color-status-sold)';
      cardOpacity = 'opacity-60';
      break;
    case 'RENTED':
      statusLabel = 'Vermietet';
      statusColor = 'var(--color-status-rented)';
      cardOpacity = 'opacity-60';
      break;
    default:
      statusLabel = '';
      statusColor = '';
      cardOpacity = '';
  }

  const isDisabled = property.status === 'RESERVED' || property.status === 'SOLD' || property.status === 'RENTED';
  return (
    <div
      className={`relative ${isDisabled ? 'opacity-60 pointer-events-none' : 'cursor-pointer hover:shadow-lg hover:border-2 dark:hover:border-primary-dark hover:border-primary/20 transition-all duration-200'} bg-secondary dark:bg-secondary-dark border border-transparent dark:border-admin-border-d  rounded shadow overflow-hidden group ${cardOpacity} w-full max-w-full sm:max-w-[350px] max-h-[480px] sm:max-h-[420px] hover:rounded-br-2xl ${className || ''}`}
      onClick={handleClick}
      style={style}
    >
      {statusLabel && (
        <span
          className="absolute top-2 right-2 z-10 px-2 py-1 rounded text-xs font-semibold"
          style={{ background: statusColor, color: '#fff' }}
        >
          {statusLabel}
        </span>
      )}
      <PropertyTypeCorner type={property.operationType} style={{ bottom: 8, right: 8 }} size={8} />
      <div className="relative w-full h-40">
        {property.image ? (
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
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
