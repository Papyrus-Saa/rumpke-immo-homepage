import PropertyLocationSection from "./PropertyLocationSection";
import PropertyBasicInfoSection from "./PropertyBasicInfoSection";
import ImageUrlOrUploadInput from "@/app/admin/hooks/properties/components/ImageUrlOrUploadInput";
import React from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import { IoInformationCircleOutline, IoPricetagOutline, IoSaveOutline } from "react-icons/io5";
import InputNumber from "./InputNumber";
import InputText from "./InputText";
import CheckboxBoolean from "./CheckboxBoolean";
import z from "zod";
import InputSelect from "./InputSelect";
import InputDate from "./InputDate";
import InputTextarea from "./InputTextarea";
import Button from "@/components/ui/Button";
import Link from "next/link";

import {
  allFields,
  furnishedOptions,
} from '@/app/admin/hooks/properties/components/propertyFormFields';
import { propertyFormSchemaZod } from '@/app/admin/hooks/properties/components/propertyFormSchema.zod';




function isFieldError(error: unknown): error is import("react-hook-form").FieldError {
  return (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}




interface PropertyFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  loading?: boolean;
  mode?: "create" | "edit";
  children?: React.ReactNode;
  getInputClassName: (field: string) => string;
  errors: any;
  highlightedField?: string;
}



const PropertyForm: React.FC<PropertyFormProps> = ({
  form,
  onSubmit,
  loading = false,
  mode = "create",
  children,
  getInputClassName,
  errors,
  highlightedField,
}) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="property-form">
      {/* Main image field */}
      <Controller
        name="main_image"
        control={form.control}
        render={({ field }) => (
          <ImageUrlOrUploadInput
            label="Hauptbild URL"
            field={field}
            error={
              typeof form.formState.errors.main_image === 'string'
                ? form.formState.errors.main_image
                : isFieldError(form.formState.errors.main_image)
                  ? form.formState.errors.main_image
                  : undefined
            }
            required
          />
        )}
      />
      {/* Property basic info section */}
      <PropertyBasicInfoSection
        register={form.register}
        errors={errors}
        getInputClassName={getInputClassName}
        control={form.control}
      />
      {/* Property location section */}
      <PropertyLocationSection
        register={form.register}
        errors={errors}
        getInputClassName={getInputClassName}
      />

      <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6 mb-4">
        <h2 className="text-lg font-semibold text-admin-text-l dark:text-admin-text-d mb-4 flex items-center gap-2">
          <IoPricetagOutline className="text-xl text-primary" />
          Zusätzliche Kosten
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="community_fees"
              control={form.control}
              render={({ field }) => (
                <InputNumber
                  name={field.name}
                  label="Nebenkosten"
                  placeholder="150"
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' || isNaN(Number(value)) ? undefined : Number(value));
                  }}
                  error={errors.community_fees?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="deposit"
              control={form.control}
              render={({ field }) => (
                <InputNumber
                  name={field.name}
                  label="Kaution"
                  placeholder="3000"
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' || isNaN(Number(value)) ? undefined : Number(value));
                  }}
                  error={errors.deposit?.message}
                />
              )}
            />
          </div>

          <div className="md:col-span-3">
            <InputText
              label="Provisionsinfo"
              placeholder="z.B. 3% des Kaufpreises"
              {...form.register('commission_info')}
              className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              error={errors.commission_info?.message}
            />
          </div>
        </div>
      </div>

      <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-admin-text-l dark:text-admin-text-d mb-4 flex items-center gap-2">
          <IoInformationCircleOutline className="text-xl text-primary" />
          Eigenschaften
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Controller
              name="usable_area_m2"
              control={form.control}
              render={({ field }) => (
                <InputNumber
                  name={field.name}
                  label="Nutzfläche (m²)"
                  placeholder="100"
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' || isNaN(Number(value)) ? undefined : Number(value));
                  }}
                  error={errors.usable_area_m2?.message}
                />
              )}
            />

          </div>

          <div>
            <Controller
              name="plot_area_m2"
              control={form.control}
              render={({ field }) => (
                <InputNumber
                  name={field.name}
                  label="Grundstücksfläche (m²)"
                  placeholder="200"
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  error={errors.plot_area_m2?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="floor"
              control={form.control}
              render={({ field }) => (
                <InputNumber
                  name={field.name}
                  label="Etage"
                  placeholder="2"
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  error={errors.floor?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="floors_total"
              control={form.control}
              render={({ field }) => (
                <InputNumber
                  name={field.name}
                  label="Etagen gesamt"
                  placeholder="5"
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  error={errors.floors_total?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="parking_spaces"
              control={form.control}
              render={({ field }) => (
                <InputNumber
                  name={field.name}
                  label="Parkplätze"
                  placeholder="1"
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  error={errors.parking_spaces?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="build_year"
              control={form.control}
              render={({ field }) => (
                <InputNumber
                  name={field.name}
                  label="Baujahr"
                  placeholder="2020"
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  error={errors.build_year?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="renovation_year"
              control={form.control}
              render={({ field }) => (
                <InputNumber
                  name={field.name}
                  label="Renovierungsjahr"
                  placeholder="2023"
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  error={errors.renovation_year?.message}
                />
              )}
            />
          </div>
        </div>


        <div className="mt-6">
          <h3 className="text-sm font-semibold text-admin-text-l dark:text-admin-text-d mb-3">Ausstattung</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { key: 'has_elevator', label: 'Aufzug' },
              { key: 'garage', label: 'Garage' },
              { key: 'storage_room', label: 'Abstellraum' },
              { key: 'air_conditioning', label: 'Klimaanlage' },
              { key: 'balcony', label: 'Balkon' },
              { key: 'terrace', label: 'Terrasse' },
              { key: 'garden', label: 'Garten' },
              { key: 'pool', label: 'Pool' },
              { key: 'fireplace', label: 'Kamin' },
              { key: 'floor_heating', label: 'Fußbodenheizung' },
              { key: 'solar_panels', label: 'Solarpaneele' },
              { key: 'concierge', label: 'Concierge' },
              { key: 'sea_view', label: 'Meerblick' },
              { key: 'mountain_view', label: 'Bergblick' },
              { key: 'city_view', label: 'Stadtblick' },
              { key: 'is_new', label: 'Neubau' },
            ].map((item) => (
              <CheckboxBoolean
                key={item.key}
                label={item.label}
                {...form.register(item.key as keyof z.infer<typeof propertyFormSchemaZod>)}
                error={errors[item.key as keyof z.infer<typeof propertyFormSchemaZod>]?.message}
                highlighted={highlightedField === item.key}
                className={`p-2 rounded-lg transition-all ${highlightedField === item.key ? 'ring-2 ring-warning bg-warning/10' : ''}`}
              />
            ))}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <InputText
              label="Küchentyp"
              placeholder="z.B. Einbauküche"
              {...form.register('kitchen_type')}
              className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              error={errors.kitchen_type?.message}
            />
          </div>

          <div>
            <InputText
              label="Heizung"
              placeholder="z.B. Zentralheizung"
              {...form.register('heating')}
              className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              error={errors.heating?.message}
            />
          </div>

          <div>
            <InputSelect
              label="Möblierung"
              options={furnishedOptions}
              {...form.register('furnished')}
              className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              error={errors.furnished?.message}
            />
          </div>

          <div>
            <InputSelect
              label="Energieeffizienzklasse"
              options={['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map(val => ({ value: val, label: val === '' ? 'Keine Auswahl' : val }))}
              {...form.register('energy_label', { setValueAs: v => v === '' ? undefined : v })}
              className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              error={errors.energy_label?.message}
            />
          </div>

          <div>
            <Controller
              name="energy_consumption_kwh_m2y"
              control={form.control}
              render={({ field }) => (
                <InputNumber
                  name={field.name}
                  label="Energieverbrauch (kWh/m²/Jahr)"
                  placeholder="80"
                  value={field.value ?? ''}
                  onChange={e => {
                    const value = e.target.value;
                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  error={errors.energy_consumption_kwh_m2y?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="available_from"
              control={form.control}
              render={({ field }) => {
                let inputValue = '';
                if (field.value instanceof Date && !isNaN(field.value.getTime())) {
                  const d = field.value;
                  inputValue = d.toISOString().slice(0, 10);
                } else if (typeof field.value === 'string') {
                  inputValue = field.value;
                }
                return (
                  <InputDate
                    name={field.name}
                    label="Verfügbar ab"
                    value={inputValue}
                    onChange={e => {
                      const value = e.target.value;
                      if (!value) {
                        field.onChange(undefined);
                      } else {
                        const d = new Date(value);
                        field.onChange(isNaN(d.getTime()) ? undefined : d);
                      }
                    }}
                    error={errors.available_from?.message}
                  />
                );
              }}
            />
          </div>
        </div>

        <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-admin-text-l dark:text-admin-text-d mb-4">
            Medien & Beschreibung
          </h2>
          <div className="space-y-4">
            <div>
              <InputTextarea
                label="Beschreibung"
                placeholder="Detaillierte Beschreibung der Immobilie..."
                rows={6}
                {...form.register('description')}
                error={errors.description?.message}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
              />
            </div>

            <div>
              <InputTextarea
                label="Interne Notizen"
                placeholder="Nur für interne Verwendung..."
                rows={3}
                {...form.register('notes_internal')}
                error={errors.notes_internal?.message}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
              />
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading} variant="primary">
            <IoSaveOutline className="text-xl" />
            <span>{loading ? 'Wird erstellt...' : 'Immobilie erstellen'}</span>
          </Button>
          <Link href="/admin/properties">
            <Button type="button" variant="secondary">
              Abbrechen
            </Button>
          </Link>
        </div>
      </div>
      {children}
    </form>
  );
};

export default PropertyForm;
