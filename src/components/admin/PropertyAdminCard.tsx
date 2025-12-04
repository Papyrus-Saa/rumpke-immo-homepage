import React, { useState } from "react";
import { propertyOptionalGroups } from "./propertyOptionalGroups";
import { IoChevronDown, IoChevronUp, IoClose } from "react-icons/io5";
import { useAgents } from "@/hooks/agents/useAgents";
import ErrorToast from "./ErrorToast";
import InlineEditField from "./InlineEditField";
import SuccessToast from "./SuccessToast";
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
  SOLD: "kauf",
  RENTED: "Vermietet",
  DRAFT: "Entwurf",
  HIDDEN: "Versteckt",
};

interface PropertyAdminCardProps {
  property: PropertyAdminPanel;
  onEdit?: () => void;
  expanded?: boolean;
  onExpand?: () => void;
  onCloseExpand?: () => void;
}

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const PropertyAdminCard: React.FC<PropertyAdminCardProps> = ({ property, onEdit, expanded, onExpand, onCloseExpand }) => {
  const [editValues, setEditValues] = useState(property);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { agents, loading: agentsLoading, error: agentsError } = useAgents();
  const [showOptional, setShowOptional] = useState(false);

  // Simula guardar cambios inline
  const handleInlineSave = (field: keyof PropertyAdminPanel, value: string | number) => {
    // Simulación de error: si el valor es "error", muestra el toast de error
    if (value === "error") {
      setErrorMsg("Fehler beim Speichern. Bitte versuchen Sie es erneut.");
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
      return;
    }
    setEditValues(prev => ({ ...prev, [field]: value }));
    if (field === "status") {
      setToastMsg("Status erfolgreich geändert!");
    } else {
      setToastMsg("Erfolgreich gespeichert!");
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    // Aquí iría la llamada al endpoint y el manejo de errores/exitos
  };

  // Opcionales: tomar los primeros 10 del modelo
  const optionalFields: Array<{ key: keyof PropertyAdminPanel; label: string }> = [
    { key: "country", label: "Land" },
    { key: "latitude", label: "Breitengrad" },
    { key: "longitude", label: "Längengrad" },
    { key: "usable_area_m2", label: "Nutzfläche (m²)" },
    { key: "plot_area_m2", label: "Grundstücksfläche (m²)" },
    { key: "floor", label: "Etage" },
    { key: "floors_total", label: "Etagen gesamt" },
    { key: "has_elevator", label: "Aufzug" },
    { key: "parking_spaces", label: "Parkplätze" },
    { key: "garage", label: "Garage" },
  ];

  if (typeof expanded !== "undefined" && expanded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="w-full h-full flex flex-col items-center justify-center">

          <div className="relative bg-card-bg-l dark:bg-card-bg-d text-card-text-l dark:text-card-text-d  shadow-2xl px-6 py-2 w-[70%] overflow-y-auto flex flex-col gap-8 rounded">
            <button
              type="button"
              className="mx-auto"
              onClick={onCloseExpand}
              aria-label="Schließen"
            >
              <IoClose className="w-4 h-4 text-primary hover:text-error cursor-pointer" />
            </button>
              <div className="flex justify-between items-center">
                <div className="w-20 h-20 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                {editValues.main_image ? (
                  <img src={editValues.main_image} alt="Immobilienfoto" className="object-cover w-full h-full" />
                ) : (
                  <span className="text-xs text-gray-400">Kein Bild</span>
                )}
              </div>
              AQUI
              </div>
            <div className="flex gap-16 items-start">
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-2">Hauptdaten</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 mb-8">
                  <InlineEditField label="Agent" value={editValues.agent} type="select" options={agentsLoading || agentsError ? [] : agents.map(a => `${a.first_name} ${a.last_name}`)} onSave={val => handleInlineSave('agent', val)} />
                  <InlineEditField label="Eingentümer" value={editValues.owner || "-"} type="text" onSave={val => handleInlineSave('owner', val)} />
                  <InlineEditField label="Vermarktungsart" value={editValues.operation === "SELL" ? "Verkauf" : "Miete"} type="select" options={["Verkauf", "Miete"]} onSave={val => handleInlineSave('operation', val === "Verkauf" ? "SELL" : "RENT")} />
                  <InlineEditField label="Typ" value={capitalize(editValues.type)} type="select" options={["Haus", "Wohnung", "Gewerbe", "Grundstueck", "Sonstige"]} onSave={val => handleInlineSave('type', val)} />
                  <InlineEditField label="Status" value={capitalize(statusLabels[editValues.status])} type="select" options={Object.keys(statusLabels)} onSave={val => handleInlineSave('status', val as PropertyAdminPanel["status"])} />
                  <InlineEditField label="Adresse" value={editValues.address_line} type="text" onSave={val => handleInlineSave('address_line', val)} />
                  <InlineEditField label="Stadt" value={editValues.city} type="text" onSave={val => handleInlineSave('city', val)} />
                  <InlineEditField label="PLZ" value={editValues.postal_code} type="text" onSave={val => handleInlineSave('postal_code', val)} />
                  <InlineEditField label="Wohnfläche (m²)" value={editValues.built_area_m2} type="number" onSave={val => handleInlineSave('built_area_m2', val)} />
                  <InlineEditField label="Zimmer" value={editValues.rooms} type="number" onSave={val => handleInlineSave('rooms', val)} />
                  <InlineEditField label="Schlafzimmer" value={editValues.bedrooms} type="number" onSave={val => handleInlineSave('bedrooms', val)} />
                  <InlineEditField label="Badezimmer" value={editValues.bathrooms} type="number" onSave={val => handleInlineSave('bathrooms', val)} />
                  <InlineEditField label="Preis" value={editValues.price_amount} type="number" onSave={val => handleInlineSave('price_amount', val)} />
                  <InlineEditField label="Währung" value={editValues.currency} type="select" options={["EUR", "USD", "CHF"]} onSave={val => handleInlineSave('currency', val)} />
                </div>

                <div className="grid grid-cols-4 gap-6">
                      {propertyOptionalGroups.filter(g => g.title === "Geografische Angaben").map(group => (
                    <div key={group.title}>
                      <h3 className="font-bold">{group.title}</h3>
                      <div className="flex flex-col gap-0 pt-2">
                        {group.fields.map(({ key, label }) => (
                          <div key={key} className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l px-2">
                            <span className="font-semibold">{label}</span>
                            <span className="font-bold">{String((editValues as Record<string, any>)[key] ?? "-")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}


                  {propertyOptionalGroups
                    .filter(g => g.title === "Finanzen & Sonstiges")
                    .map(group => (
                      <div key={group.title} className="mb-6">
                        <h3 className="font-bold">{group.title}</h3>
                        <div className="flex flex-col gap-0 pt-2">
                          {group.fields.map(({ key, label }) => (
                            <div key={key} className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l px-2">
                              <span className="font-semibold">{label}</span>
                              <span className="font-bold">{String((editValues as Record<string, any>)[key] ?? "-")}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  {propertyOptionalGroups
                    .filter(g => g.title === "Technische Angaben")
                    .map(group => (
                      <div key={group.title} className="mb-6">
                        <h3 className="font-bold">{group.title}</h3>
                        <div className="flex flex-col gap-0 pt-2">
                          {group.fields.map(({ key, label }) => (
                            <div key={key} className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l px-2">
                              <span className="font-semibold">{label}</span>
                              <span className="font-bold">{String((editValues as Record<string, any>)[key] ?? "-")}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                  {propertyOptionalGroups
                    .filter(g => g.title === "Ausstattung & Komfort")
                    .map(group => (
                      <div key={group.title} className="mb-6">
                        <h3 className="font-bold">{group.title}</h3>
                        <div className="flex flex-col gap-0 pt-2">
                          {group.fields.map(({ key, label }) => (
                            <div key={key} className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l px-2">
                              <span className="font-semibold">{label}</span>
                              <span className="font-bold">{String((editValues as Record<string, any>)[key] ?? "-")}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex gap-2 justify-between">
                <span
                  className="inline-flex items-center justify-center min-w-[90px] h-7 rounded text-xs font-semibold"
                  style={{ background: statusColorVars[editValues.status], color: '#fff', padding: '0 12px' }}
                >
                  {capitalize(statusLabels[editValues.status])}
                </span>
                <button
                  type="button"
                  onClick={onEdit}
                  className="px-3 py-1 rounded bg-card-secondary-bg-l dark:bg-card-secondary-bg-d dark:hover:bg-Bghover-d hover:bg-Bghover-l text-xs font-semibold flex items-center justify-center shadow-md cursor-pointer border-admin-border-l dark:border-admin-border-d"
                  title="Bearbeiten"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            {showToast && <SuccessToast message={toastMsg} />}
            {showError && <ErrorToast message={errorMsg} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded shadow-md px-5 py-2 gap-3 min-h-[340px] w-full mx-auto bg-card-bg-l dark:bg-card-bg-d text-card-text-l dark:text-card-text-d"
    >

      <div className="flex gap-4 items-start">
        <div className="w-24 h-24 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
          {editValues.main_image ? (
            <img src={editValues.main_image} alt="Immobilienfoto" className="object-cover w-full h-full" />
          ) : (
            <span className="text-xs text-gray-400">Kein Bild</span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-0">

          <div
            className={`overflow-hidden transition-all duration-300 ${showOptional ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="flex flex-col gap-0 pt-2">
              {optionalFields.map(({ key, label }) => (
                <div key={key} className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l px-2">
                  <span className="font-semibold">{label}</span>
                  <span className="font-bold">{editValues[key] !== undefined && editValues[key] !== null ? String(editValues[key]) : "-"}</span>
                </div>
              ))}
            </div>
          </div>
          <InlineEditField
            label="Agent"
            value={editValues.agent}
            type="select"
            options={agentsLoading || agentsError ? [] : agents.map(a => `${a.first_name} ${a.last_name}`)}
            onSave={val => handleInlineSave('agent', val)}
          />
          <InlineEditField label="Eingentümer" value={editValues.owner || "-"} type="text" onSave={val => handleInlineSave('owner', val)} />
          <InlineEditField label="Vermarktungsart" value={editValues.operation === "SELL" ? "Verkauf" : "Miete"} type="select" options={["Verkauf", "Miete"]} onSave={val => handleInlineSave('operation', val === "Verkauf" ? "SELL" : "RENT")} />
          <InlineEditField label="Typ" value={capitalize(editValues.type)} type="select" options={["Haus", "Wohnung", "Gewerbe", "Grundstueck", "Sonstige"]} onSave={val => handleInlineSave('type', val)} />
          <InlineEditField label="Status" value={capitalize(statusLabels[editValues.status])} type="select" options={Object.keys(statusLabels)} onSave={val => handleInlineSave('status', val as PropertyAdminPanel["status"])} />
          <InlineEditField label="Adresse" value={editValues.address_line} type="text" onSave={val => handleInlineSave('address_line', val)} />
          <InlineEditField label="Stadt" value={editValues.city} type="text" onSave={val => handleInlineSave('city', val)} />
          <InlineEditField label="PLZ" value={editValues.postal_code} type="text" onSave={val => handleInlineSave('postal_code', val)} />
          <InlineEditField label="Wohnfläche (m²)" value={editValues.built_area_m2} type="number" onSave={val => handleInlineSave('built_area_m2', val)} />
          <InlineEditField label="Zimmer" value={editValues.rooms} type="number" onSave={val => handleInlineSave('rooms', val)} />
          <InlineEditField label="Schlafzimmer" value={editValues.bedrooms} type="number" onSave={val => handleInlineSave('bedrooms', val)} />
          <InlineEditField label="Badezimmer" value={editValues.bathrooms} type="number" onSave={val => handleInlineSave('bathrooms', val)} />
          <InlineEditField label="Preis" value={editValues.price_amount} type="number" onSave={val => handleInlineSave('price_amount', val)} />
          <InlineEditField label="Währung" value={editValues.currency} type="select" options={["EUR", "USD", "CHF"]} onSave={val => handleInlineSave('currency', val)} />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2 justify-between">
          <span
            className="inline-flex items-center justify-center min-w-[90px] h-7 rounded text-xs font-semibold"
            style={{ background: statusColorVars[editValues.status], color: '#fff', padding: '0 12px' }}
          >
            {capitalize(statusLabels[editValues.status])}
          </span>
          <button
            type="button"
            onClick={onEdit}
            className="px-3 py-1 rounded bg-card-secondary-bg-l dark:bg-card-secondary-bg-d dark:hover:bg-Bghover-d hover:bg-Bghover-l text-xs font-semibold flex items-center justify-center shadow-md cursor-pointer border-admin-border-l dark:border-admin-border-d"
            title="Bearbeiten"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
        </div>
        <button
          type="button"
          className="mx-auto flex items-center gap-1 text-xs text-primary hover:underline cursor-pointer  dark:hover:bg-Bghover-d hover:bg-Bghover-l rounded px-2 py-1"
          onClick={onExpand}
          aria-label="Mehr anzeigen"
        >
          <IoChevronDown className="w-4 h-4" />
        </button>
      </div>
      {showToast && <SuccessToast message={toastMsg} />}
      {showError && <ErrorToast message={errorMsg} />}
    </div>
  );
};

export default PropertyAdminCard;
