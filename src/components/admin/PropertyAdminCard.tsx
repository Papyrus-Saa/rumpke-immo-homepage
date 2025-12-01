import React from "react";
import PencilIcon from "../ui/icons/PencilIcon";
import { PropertyAdminPanel } from "@/interfaces/PropertyAdminPanel";

const statusColorVars: Record<PropertyAdminPanel["status"], string> = {
  PUBLISHED: "var(--color-status-published)",
  RESERVED: "var(--color-status-reserved)",
  SOLD: "var(--color-status-sold)",
  RENTED: "var(--color-status-rented)",
  DRAFT: "var(--color-status-draft)",
  HIDDEN: "var(--color-status-hidden)",
};

const statusLabels: Record<PropertyAdminPanel["status"], string> = {
  PUBLISHED: "Veröffentlicht",
  RESERVED: "Reserviert",
  SOLD: "Verkauft",
  RENTED: "Vermietet",
  DRAFT: "Entwurf",
  HIDDEN: "Versteckt",
};

interface PropertyAdminCardProps {
  property: PropertyAdminPanel;
  onEdit?: () => void;
}

const PropertyAdminCard: React.FC<PropertyAdminCardProps> = ({ property, onEdit }) => {
  return (
    <div
      className="rounded shadow-md px-5 py-2 gap-3 min-h-[340px] w-full mx-auto bg-card-bg-l dark:bg-card-bg-d"
    >
      <div className="flex gap-4 items-start">
        <div className="w-24 h-24 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
          {property.main_image ? (
            <img src={property.main_image} alt="Immobilienfoto" className="object-cover w-full h-full" />
          ) : (
            <span className="text-xs text-gray-400">Kein Bild</span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-0">
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Agent</span><span className="font-bold">{property.agent}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Vorgang</span><span className="font-bold">{property.operation === "SELL" ? "Verkauf" : "Miete"}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Typ</span><span className="font-bold">{property.type}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Status</span><span className="font-bold">{statusLabels[property.status]}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Adresse</span><span className="font-bold">{property.address_line}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Stadt</span><span className="font-bold">{property.city}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">PLZ</span><span className="font-bold">{property.postal_code}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Wohnfläche (m²)</span><span className="font-bold">{property.built_area_m2}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Zimmer</span><span className="font-bold">{property.rooms}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Schlafzimmer</span><span className="font-bold">{property.bedrooms}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Badezimmer</span><span className="font-bold">{property.bathrooms}</span></div>
          <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l" ><span className="font-semibold">Preis</span><span className="font-bold">{property.price_amount} {property.currency}</span></div>
        </div>
      </div>
      <div className="flex gap-2 justify-between mt-4">
        <span
          className="inline-flex items-center justify-center min-w-[90px] h-7 rounded text-xs font-semibold"
          style={{ background: statusColorVars[property.status], color: '#fff', padding: '0 12px' }}
        >
          {statusLabels[property.status]}
        </span>
        <button
          type="button"
          onClick={onEdit}
          className="px-3 py-1 rounded bg-primary text-white text-xs font-semibold flex items-center justify-center shadow-md cursor-pointer"
          title="Bearbeiten"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PropertyAdminCard;
