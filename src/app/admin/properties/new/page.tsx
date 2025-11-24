"use client";


declare global {
  interface Window {
    cloudinary: any;
  }
}

import { useForm } from "react-hook-form";
import { PropertyFormValues } from "@/interfaces/propertyFormValues";
import InputProperty from "@/components/properties/InputProperty";
import InputSelectProperty from "@/components/properties/InputSelectProperty";
import { booleanPropertyFields, optionalPropertyFields, energyLabelOptions, typeOptions, operationOptions, statusOptions } from "@/components/properties/propertyFields";
import { useAgents } from "@/hooks/agents/useAgents";



export default function PropertyFormPage() {
  const { agents, loading: agentsLoading, error: agentsError } = useAgents();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    defaultValues: { country: "Deutschland" }
  });

  const media = watch('media') || [];

  const onSubmit = (data: PropertyFormValues) => {
    // Aquí va la lógica para guardar la propiedad
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto bg-card-bg-l dark:bg-card-bg-d p-8 rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Neue Immobilie anlegen</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bilder</label>
          <button
            type="button"
            onClick={() => {
              if (window.cloudinary) {
                window.cloudinary.openUploadWidget(
                  {
                    cloudName: 'TU_CLOUD_NAME',
                    uploadPreset: 'TU_UPLOAD_PRESET',
                    sources: ['local', 'url', 'camera'],
                    multiple: true,
                    resourceType: 'image',
                  },
                  (error: any, result: any) => {
                    if (!error && result && result.event === "success") {
                      setValue('media', [...media, result.info.secure_url]);
                    }
                  }
                );
              }
            }}
            className="w-full bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded hover:bg-primary/90 cursor-pointer"
          >
            Bilder hochladen
          </button>

          <div className="grid grid-cols-3 gap-2 mt-2">
            {media.map((url, idx) => (
              <div key={idx} className="relative">
                <img src={url} alt={`Bild ${idx + 1}`} className="w-full h-32 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => {
                    setValue('media', media.filter((_, i) => i !== idx));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded px-2"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <InputSelectProperty
          label="Makler"
          name="agent_id"
          options={agents.map(agent => ({ value: agent.id, label: `${agent.first_name} ${agent.last_name}` }))}
          required
          registerProps={register("agent_id", { required: "Dieses Feld ist erforderlich" })}
          error={errors.agent_id?.message}
        />
        <InputSelectProperty
          label="Vorgang"
          name="operation"
          options={operationOptions}
          required
          registerProps={register("operation", { required: "Dieses Feld ist erforderlich" })}
          error={errors.operation?.message}
        />
        <InputSelectProperty
          label="Typ"
          name="type"
          options={typeOptions}
          required
          registerProps={register("type", { required: "Dieses Feld ist erforderlich" })}
          error={errors.type?.message}
        />
        <InputSelectProperty
          label="Status"
          name="status"
          required
          options={statusOptions}
          registerProps={register("status", { required: "Dieses Feld ist erforderlich" })}
          error={errors.status?.message}
        />
        <InputProperty
          label="Adresse"
          required
          name="address_line"
          registerProps={register("address_line", { required: "Dieses Feld ist erforderlich" })}
          error={errors.address_line?.message}
        />
        <InputProperty
          label="Stadt"
          required
          name="city"
          registerProps={register("city", { required: "Dieses Feld ist erforderlich" })}
          error={errors.city?.message}
        />
        <InputProperty
          label="PLZ"
          required
          name="postal_code"
          registerProps={register("postal_code", { required: "Dieses Feld ist erforderlich" })}
          error={errors.postal_code?.message}
        />
        <InputProperty
          label="Region"
          required
          name="region"
          registerProps={register("region", { required: "Dieses Feld ist erforderlich" })}
          error={errors.region?.message}
        />
        <InputProperty
          label="Wohnfläche (m²)"
          required
          name="built_area_m2"
          type="number"
          registerProps={register("built_area_m2", { required: "Dieses Feld ist erforderlich" })}
          error={errors.built_area_m2?.message}
        />
        <InputProperty
          label="Zimmer"
          required
          name="rooms"
          type="number"
          registerProps={register("rooms", { required: "Dieses Feld ist erforderlich" })}
          error={errors.rooms?.message}
        />
        <InputProperty
          label="Schlafzimmer"
          required
          name="bedrooms"
          type="number"
          registerProps={register("bedrooms", { required: "Dieses Feld ist erforderlich" })}
          error={errors.bedrooms?.message}
        />
        <InputProperty
          label="Badezimmer"
          required
          name="bathrooms"
          type="number"
          registerProps={register("bathrooms", { required: "Dieses Feld ist erforderlich" })}
          error={errors.bathrooms?.message}
        />
        <InputProperty
          label="Preis (€)"
          required
          name="price_amount"
          type="number"
          registerProps={register("price_amount", { required: "Dieses Feld ist erforderlich" })}
          error={errors.price_amount?.message}
        />

        <InputProperty
          label="Land"
          name="country"
          required
          defaultValue="Deutschland"
          registerProps={register("country", { required: "Dieses Feld ist erforderlich" })}
          error={errors.country?.message}
        />

        <InputProperty label="Latitude" name="latitude" type="number" registerProps={register("latitude")} error={errors.latitude?.message} />
        <InputProperty label="Longitude" name="longitude" type="number" registerProps={register("longitude")} error={errors.longitude?.message} />
        <InputProperty label="Nutzfläche (m²)" name="usable_area_m2" type="number" registerProps={register("usable_area_m2")} error={errors.usable_area_m2?.message} />
        <InputProperty label="Grundstücksfläche (m²)" name="plot_area_m2" type="number" registerProps={register("plot_area_m2")} error={errors.plot_area_m2?.message} />
        <InputProperty label="Etage" name="floor" type="number" registerProps={register("floor")} error={errors.floor?.message} />
        <InputProperty label="Gesamtanzahl Etagen" name="floors_total" type="number" registerProps={register("floors_total")} error={errors.floors_total?.message} />
        <InputProperty label="Parkplätze" name="parking_spaces" type="number" registerProps={register("parking_spaces")} error={errors.parking_spaces?.message} />
        <InputProperty label="Baujahr" name="build_year" type="number" registerProps={register("build_year")} error={errors.build_year?.message} />
        <InputProperty label="Renovierungsjahr" name="renovation_year" type="number" registerProps={register("renovation_year")} error={errors.renovation_year?.message} />
        <InputProperty label="Gemeinschaftskosten (€)" name="community_fees" type="number" registerProps={register("community_fees")} error={errors.community_fees?.message} />
        <InputProperty label="Grundsteuer (€)" name="property_tax" type="number" registerProps={register("property_tax")} error={errors.property_tax?.message} />
        <InputProperty label="Kaution (€)" name="deposit" type="number" registerProps={register("deposit")} error={errors.deposit?.message} />
        <InputProperty label="Energieverbrauch (kWh/m²/Jahr)" name="energy_consumption_kwh_m2y" type="number" registerProps={register("energy_consumption_kwh_m2y")} error={errors.energy_consumption_kwh_m2y?.message} />
        <InputProperty label="CO2-Emissionen (kg/m²/Jahr)" name="co2_emissions_kg_m2y" type="number" registerProps={register("co2_emissions_kg_m2y")} error={errors.co2_emissions_kg_m2y?.message} />

      </div>

      <div className="col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

        {booleanPropertyFields.map((cb) => (
          <div key={cb.name} className="flex items-center gap-2">
            <input type="checkbox" {...register(cb.name as keyof PropertyFormValues)} id={cb.name} className="w-5 h-5" />
            <label htmlFor={cb.name} className="text-sm text-gray-700 dark:text-gray-300">{cb.label}</label>
          </div>
        ))}

        {optionalPropertyFields.map((field) => (
          <InputProperty
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            registerProps={register(field.name as keyof PropertyFormValues)}
            error={(errors as any)[field.name]?.message}
          />
        ))}

        <InputSelectProperty label="Energieklasse" name="energy_label" options={energyLabelOptions} registerProps={register("energy_label")} error={errors.energy_label?.message} />
        <div className="col-span-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Beschreibung</label>
          <textarea {...register("description")} className="w-full px-4 py-2  rounded bg-input-bg dark:bg-input-bg-dark text-sm placeholder:text-placeholder text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary" rows={3} />
        </div>
        <div className="col-span-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interne Notizen</label>
          <textarea {...register("notes_internal")} className="w-full px-4 py-2  rounded bg-input-bg dark:bg-input-bg-dark text-sm placeholder:text-placeholder text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary" rows={2} />
        </div>

      </div>
      <button
        type="submit"
        className="w-full py-3 cursor-pointer bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors mt-8"
      >
        Speichern
      </button>
    </form>
  );
}
