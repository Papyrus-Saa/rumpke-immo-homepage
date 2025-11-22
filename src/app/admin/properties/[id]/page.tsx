
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  PropertyFormValues,
  PropertyType,
  PropertyStatus,
  EnergyLabel
} from "@/interfaces/property-form-interface";
import InputProperty from "@/components/properties/InputProperty";
import InputCheckboxProperty from "@/components/properties/InputCheckboxProperty";
import { useAgentOptions } from "@/hooks/useAgentOptions";
import { useRouter } from "next/navigation";

interface Props {
  params: {
    id: Promise<string>;
  };
}

export default function EditPropertyPage({ params }: Props) {

  const { id } = params;
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState<PropertyFormValues | null>(null);
  const feedbackRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { options: agentOptions, loading: loadingAgents, error: errorAgents } = useAgentOptions();

  const form = useForm<PropertyFormValues>({
    defaultValues: initialValues || {},
  });
  const { register, handleSubmit, formState: { errors }, reset } = form;

  React.useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
        const res = await fetch(`${API_URL}/property/${id}`, {
          headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || 'Fehler beim Laden der Immobilie.');
        }
        const data = await res.json();
        setInitialValues(data);
        reset(data);
      } catch (err: any) {
        setErrorMsg(err.message || 'Fehler beim Laden der Immobilie.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, reset]);

  React.useEffect(() => {
    if (errorMsg && feedbackRef.current) {
      const y = feedbackRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [errorMsg]);

  const onSubmit = async (data: PropertyFormValues) => {
    setSaving(true);
    setErrorMsg(null);
    setSuccess(false);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const response = await fetch(`${API_URL}/property/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        let errorText = "Fehler beim Speichern der Immobilie.";
        try {
          const errorData = await response.json();
          errorText = errorData.message || errorText;
        } catch { }
        throw new Error(errorText);
      }
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/properties");
      }, 1200);
    } catch (error: any) {
      setErrorMsg(error.message || "Fehler beim Speichern der Immobilie.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="max-w-5xl mx-auto py-8 px-4 text-center text-primary font-semibold">Lade Immobilie...</div>;
  }

  return (
    <div className="w-[90%] max-w-6xl mx-auto p-6 bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Immobilie bearbeiten</h1>
        <a href="/admin/properties" className="px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary-dark transition cursor-pointer duration-100">Zurück zur Übersicht</a>
      </div>
      <div ref={feedbackRef} />
      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-300 text-center font-semibold">
          Immobilie erfolgreich gespeichert!
        </div>
      )}
      {errorMsg && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-300 text-center font-semibold">
          {errorMsg}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* Makler (ID) */}
        <div>
          <label className="block mb-1 font-medium text-xs dark:text-variable-white">Makler (ID) *</label>
          <select
            className="w-full p-2 rounded bg-primary/30 dark:bg-primary-dark/30 text-xs"
            {...register("agent", { required: true })}
            disabled={loadingAgents}
          >
            <option value="">{loadingAgents ? "Lade Makler..." : "Bitte wählen"}</option>
            {agentOptions.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name} ({agent.id})
              </option>
            ))}
          </select>
          {errorAgents && <span className="text-variable-error text-xs">{errorAgents}</span>}
          {errors.agent && <span className="text-variable-error text-xs">{errors.agent.message}</span>}
        </div>
        {/* Vorgang */}
        <div>
          <label className="block mb-1 font-medium text-xs  dark:text-variable-white">Vorgang *</label>
          <select className="w-full p-2 rounded bg-primary/30 dark:bg-primary-dark/30  text-xs" {...register("operation", { required: true })}>
            <option value="SELL">Verkauf</option>
            <option value="RENT">Miete</option>
          </select>
        </div>
        {/* Immobilientyp */}
        <div>
          <label className="block mb-1 font-medium text-xs  dark:text-variable-white">Immobilientyp *</label>
          <select className="w-full p-2 rounded bg-primary/30 dark:bg-primary-dark/30  text-xs" {...register("type", { required: true })}>
            {Object.values(PropertyType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        {/* Adresse */}
        <InputProperty
          label="Adresse"
          name="address_line"
          placeholder="Adresse"
          required
          register={register}
          error={errors.address_line?.message}
        />
        {/* Stadt */}
        <InputProperty
          label="Stadt"
          name="city"
          placeholder="Stadt"
          required
          register={register}
          error={errors.city?.message}
        />
        {/* PLZ */}
        <InputProperty
          label="PLZ"
          name="postal_code"
          placeholder="PLZ"
          required
          register={register}
          error={errors.postal_code?.message}
        />
        {/* Region */}
        <InputProperty
          label="Region"
          name="region"
          placeholder="Region"
          required
          register={register}
          error={errors.region?.message}
        />
        {/* Wohnfläche */}
        <InputProperty
          label="Wohnfläche (m²)"
          name="built_area_m2"
          type="number"
          required
          register={register}
          error={errors.built_area_m2?.message}
        />
        {/* Zimmer */}
        <InputProperty
          label="Zimmer"
          name="rooms"
          type="number"
          required
          register={register}
          error={errors.rooms?.message}
        />
        {/* Schlafzimmer */}
        <InputProperty
          label="Schlafzimmer"
          name="bedrooms"
          type="number"
          required
          register={register}
          error={errors.bedrooms?.message}
        />
        {/* Bäder */}
        <InputProperty
          label="Bäder"
          name="bathrooms"
          type="number"
          required
          register={register}
          error={errors.bathrooms?.message}
        />
        {/* Preis */}
        <InputProperty
          label="Preis"
          name="price_amount"
          type="number"
          required
          register={register}
          error={errors.price_amount?.message}
        />
        {/* Status */}
        <div>
          <label className="block mb-1 font-medium  dark:text-variable-white">Status</label>
          <select className="w-full p-2 rounded bg-variable-input-bg dark:bg-variable-input-bg-dark  bg-primary/30 dark:bg-primary-dark/30" {...register("status")}>
            <option value="">Bitte wählen</option>
            {Object.values(PropertyStatus).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        {/* Land */}
        <InputProperty
          label="Land"
          name="country"
          register={register}
          error={errors.country?.message}
        />
        {/* Latitude/Longitude */}
        <InputProperty
          label="Breitengrad"
          name="latitude"
          type="number"
          register={register}
          error={errors.latitude?.message}
        />
        <InputProperty
          label="Längengrad"
          name="longitude"
          type="number"
          register={register}
          error={errors.longitude?.message}
        />
        <InputProperty
          label="Nutzfläche (m²)"
          name="usable_area_m2"
          type="number"
          register={register}
          error={errors.usable_area_m2?.message}
        />
        <InputProperty
          label="Grundstücksfläche (m²)"
          name="plot_area_m2"
          type="number"
          register={register}
          error={errors.plot_area_m2?.message}
        />
        <InputProperty
          label="Etage"
          name="floor"
          type="number"
          register={register}
          error={errors.floor?.message}
        />
        <InputProperty
          label="Gesamtetagen"
          name="floors_total"
          type="number"
          register={register}
          error={errors.floors_total?.message}
        />
        <InputCheckboxProperty
          label="Aufzug"
          name="has_elevator"
          register={register}
          error={errors.has_elevator?.message}
        />
        <InputProperty
          label="Parkplätze"
          name="parking_spaces"
          type="number"
          register={register}
          error={errors.parking_spaces?.message}
        />
        <InputCheckboxProperty
          label="Garage"
          name="garage"
          register={register}
          error={errors.garage?.message}
        />
        <InputCheckboxProperty
          label="Abstellraum"
          name="storage_room"
          register={register}
          error={errors.storage_room?.message}
        />
        <InputProperty
          label="Küchentyp"
          name="kitchen_type"
          register={register}
          error={errors.kitchen_type?.message}
        />
        <InputProperty
          label="Heizung"
          name="heating"
          register={register}
          error={errors.heating?.message}
        />
        <InputCheckboxProperty
          label="Klimaanlage"
          name="air_conditioning"
          register={register}
          error={errors.air_conditioning?.message}
        />
        <InputProperty
          label="Möbliert"
          name="furnished"
          register={register}
          error={errors.furnished?.message}
        />
        <InputProperty
          label="Ausrichtung"
          name="orientation"
          register={register}
          error={errors.orientation?.message}
        />
        <InputProperty
          label="Baujahr"
          name="build_year"
          type="number"
          register={register}
          error={errors.build_year?.message}
        />
        <InputProperty
          label="Renovierungsjahr"
          name="renovation_year"
          type="number"
          register={register}
          error={errors.renovation_year?.message}
        />
        <InputProperty
          label="Verfügbar ab"
          name="available_from"
          type="date"
          register={register}
          error={errors.available_from?.message}
        />
        <InputProperty
          label="Währung"
          name="currency"
          register={register}
          error={errors.currency?.message}
        />
        <InputProperty
          label="Preisintervall"
          name="price_frequency"
          register={register}
          error={errors.price_frequency?.message}
        />
        <InputProperty
          label="Nebenkosten (€)"
          name="community_fees"
          type="number"
          register={register}
          error={errors.community_fees?.message}
        />
        <InputProperty
          label="Grundsteuer (€)"
          name="property_tax"
          type="number"
          register={register}
          error={errors.property_tax?.message}
        />
        <InputProperty
          label="Kaution (€)"
          name="deposit"
          type="number"
          register={register}
          error={errors.deposit?.message}
        />
        <InputProperty
          label="Provision"
          name="commission_info"
          register={register}
          error={errors.commission_info?.message}
        />
        {/* Energie */}
        <div>
          <label className="block mb-1 font-medium  dark:text-variable-white">Energieklasse</label>
          <select className="w-full p-2 rounded bg-variable-input-bg dark:bg-variable-input-bg-dark  bg-primary/30 dark:bg-primary-dark/30" {...register("energy_label")}>
            <option value="">Bitte wählen</option>
            {Object.values(EnergyLabel).map((label) => (
              <option key={label} value={label}>{label}</option>
            ))}
          </select>
        </div>
        <InputProperty
          label="Energieverbrauch (kWh/m²/Jahr)"
          name="energy_consumption_kwh_m2y"
          type="number"
          register={register}
          error={errors.energy_consumption_kwh_m2y?.message}
        />
        <InputProperty
          label="CO₂-Emissionen (kg/m²/Jahr)"
          name="co2_emissions_kg_m2y"
          type="number"
          register={register}
          error={errors.co2_emissions_kg_m2y?.message}
        />
        <InputProperty
          label="Energiezertifikat URL"
          name="energy_certificate_url"
          register={register}
          error={errors.energy_certificate_url?.message}
        />
        {/* Balkon, Terrasse, Garten, Pool, Kamin, Haustiere, Ausblick, Extras */}
        <InputCheckboxProperty label="Balkon" name="balcony" register={register} error={errors.balcony?.message} />
        <InputCheckboxProperty label="Terrasse" name="terrace" register={register} error={errors.terrace?.message} />
        <InputCheckboxProperty label="Garten" name="garden" register={register} error={errors.garden?.message} />
        <InputCheckboxProperty label="Pool" name="pool" register={register} error={errors.pool?.message} />
        <InputCheckboxProperty label="Kamin" name="fireplace" register={register} error={errors.fireplace?.message} />
        <InputCheckboxProperty label="Haustiere erlaubt" name="pets_allowed" register={register} error={errors.pets_allowed?.message} />
        <InputCheckboxProperty label="Meerblick" name="sea_view" register={register} error={errors.sea_view?.message} />
        <InputCheckboxProperty label="Bergblick" name="mountain_view" register={register} error={errors.mountain_view?.message} />
        <InputCheckboxProperty label="Stadtblick" name="city_view" register={register} error={errors.city_view?.message} />
        <InputCheckboxProperty label="Doppelverglasung" name="double_glazing" register={register} error={errors.double_glazing?.message} />
        <InputCheckboxProperty label="Smart Home" name="smart_home" register={register} error={errors.smart_home?.message} />
        <InputCheckboxProperty label="Solaranlage" name="solar_panels" register={register} error={errors.solar_panels?.message} />
        <InputCheckboxProperty label="Fußbodenheizung" name="floor_heating" register={register} error={errors.floor_heating?.message} />
        <InputCheckboxProperty label="Sicherheitstür" name="security_door" register={register} error={errors.security_door?.message} />
        <InputCheckboxProperty label="Videoüberwachung (CCTV)" name="cctv" register={register} error={errors.cctv?.message} />
        <InputCheckboxProperty label="Concierge" name="concierge" register={register} error={errors.concierge?.message} />
        {/* Beschreibung, interne Notizen, Titel, Featured, Neu */}
        <div className="col-span-full bg-primary/30 dark:bg-primary-dark/30">
          <label className="block mb-1 pl-2 font-medium  dark:text-variable-white bg-primary dark:bg-primary-dark text-white">Beschreibung</label>
          <textarea rows={3} className="w-full p-2 rounded bg-variable-input-bg dark:bg-variable-input-bg-dark  dark:text-variable-white" {...register("description")} />
        </div>
        <div className="col-span-full bg-primary/30 dark:bg-primary-dark/30">
          <label className="block mb-1 pl-2 font-medium  dark:text-variable-white bg-primary dark:bg-primary-dark text-white">Interne Notizen</label>
          <textarea rows={2} className="w-full p-2 rounded bg-variable-input-bg dark:bg-variable-input-bg-dark  dark:text-variable-white" {...register("notes_internal")} />
        </div>
        <div className="col-span-full">
          <label className="block mb-1 font-medium  dark:text-variable-white">Titel</label>
          <input className="w-full p-2 rounded bg-variable-input-bg dark:bg-variable-input-bg-dark  dark:text-variable-white" {...register("title")} />
        </div>
        <InputCheckboxProperty label="Hervorgehoben" name="is_featured" register={register} error={errors.is_featured?.message} />
        <InputCheckboxProperty label="Neu" name="is_new" register={register} error={errors.is_new?.message} />
        {/* Button */}
        <div className="col-span-full flex justify-end mt-4">
          <button
            type="submit"
            className="py-2 px-6 rounded bg-primary text-white font-semibold hover:bg-primary-dark transition duration-100 cursor-pointer flex items-center gap-2"
            disabled={saving}
          >
            {saving && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            )}
            {saving ? "Speichern..." : "Änderungen speichern"}
          </button>
        </div>
      </form>
    </div>
  );
}
