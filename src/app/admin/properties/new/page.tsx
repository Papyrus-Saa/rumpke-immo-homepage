'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertyFormSchemaZod } from '@/app/admin/hooks/properties/components/propertyFormSchema.zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { IoArrowBackOutline, IoSaveOutline, IoPricetagOutline, IoInformationCircleOutline } from 'react-icons/io5';



import InputSelect from '../../components/properties/components/InputSelect';
import InputDate from '../../components/properties/components/InputDate';
import InputTextarea from '../../components/properties/components/InputTextarea';
import CheckboxBoolean from '../../components/properties/components/CheckboxBoolean';
import { usePropertyForm } from '@/app/admin/hooks/properties/components/usePropertyForm';
import QuickFieldSearchInput from '@/app/admin/hooks/properties/components/QuickFieldSearchInput';
import InputNumber from '../../components/properties/components/InputNumber';
import PropertyBasicInfoSection from '../../components/properties/components/PropertyBasicInfoSection';
import PropertyLocationSection from '../../components/properties/components/PropertyLocationSection';
import InputText from '../../components/properties/components/InputText';



import {
  allFields,
  furnishedOptions,
} from '@/app/admin/hooks/properties/components/propertyFormFields';
import z from 'zod';
import ImageUrlOrUploadInput from '../../hooks/properties/components/ImageUrlOrUploadInput';



export default function NewPropertyPage() {
  if (typeof window !== 'undefined' && !localStorage.getItem('admin_token')) {
    window.location.replace('/admin/login');
    return null;
  }

  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError: setFormError,
  } = useForm<z.infer<typeof propertyFormSchemaZod>>({
    resolver: zodResolver(propertyFormSchemaZod),
    defaultValues: {
      operation: 'SELL',
      type: 'wohnung',
      status: 'DRAFT',
      currency: 'EUR',
      country: 'Deutschland',
      category: 'wohnung',
    },
  });


  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    highlightedField,
    scrollToField,
    getInputClassName,
    setSearchResults,
  } = usePropertyForm({ allFields, errors });


  const onSubmit = async (rawData: z.infer<typeof propertyFormSchemaZod>) => {


    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // TODO: Implementar createProperty en admin-client.ts
      // await createProperty(rawData);

      setSuccess('Immobilie erfolgreich erstellt!');
      setTimeout(() => router.push('/admin/properties'), 1500);
    } catch (err: any) {
      if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        err.response.data.errors.forEach((error: any, index: number) => {
          if (error.field && error.message) {
            setFormError(error.field as any, { type: 'manual', message: error.message });
            if (index === 0) {
              setTimeout(() => {
                const errorElement = document.getElementsByName(error.field)[0];
                if (errorElement) {
                  errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  errorElement.focus();
                }
              }, 100);
            }
          }
        });
      } else if (err?.response?.data?.message) {
        const msg = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(' ')
          : err.response.data.message;
        setError(msg);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError('API-Anfrage fehlgeschlagen');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-2 hover:text-primary mb-4 text-xs text-primary hover:underline"
        >
          <IoArrowBackOutline />
          <span>Zurück zur Immobilienübersicht</span>
        </Link>
        <h1 className="text-2xl font-bold text-admin-text-l dark:text-admin-text-d">Neue Immobilie erstellen</h1>
        <p className="text-sm text-admin-text-l dark:text-admin-text-d mt-1">
          Fügen Sie eine neue Immobilie zu Ihrem Portfolio hinzu
        </p>
      </div>


      <QuickFieldSearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        scrollToField={scrollToField}
        setSearchResults={setSearchResults}
      />


      {error && (
        <div className="mb-6 p-4 bg-error/10 dark:bg-error/20 border border-error dark:border-error rounded-lg">
          <p className="text-sm text-error dark:text-error">{error}</p>
        </div>
      )}


      {success && (
        <div className="mb-6 p-4 bg-success/10 dark:bg-success/20 border border-success dark:border-success rounded-lg">
          <p className="text-sm text-success dark:text-success">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-6">

        <Controller
          name="main_image"
          control={control}
          render={({ field }) => (
            <ImageUrlOrUploadInput
              label="Hauptbild URL"
              field={field}
              error={errors.main_image}
              required
            />
          )}
        />

        <PropertyBasicInfoSection
          register={register}
          errors={errors}
          getInputClassName={getInputClassName}
          control={control}
        />


        <PropertyLocationSection
          register={register}
          errors={errors}
          getInputClassName={getInputClassName}
        />


        <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-admin-text-l dark:text-admin-text-d mb-4 flex items-center gap-2">
            <IoPricetagOutline className="text-xl text-primary" />
            Zusätzliche Kosten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Controller
                name="community_fees"
                control={control}
                render={({ field }) => (
                  <InputNumber
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
                control={control}
                render={({ field }) => (
                  <InputNumber
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
                {...register('commission_info')}
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
                control={control}
                render={({ field }) => (
                  <InputNumber
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
                control={control}
                render={({ field }) => (
                  <InputNumber
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
                control={control}
                render={({ field }) => (
                  <InputNumber
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
                control={control}
                render={({ field }) => (
                  <InputNumber
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
                control={control}
                render={({ field }) => (
                  <InputNumber
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
                control={control}
                render={({ field }) => (
                  <InputNumber
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
                control={control}
                render={({ field }) => (
                  <InputNumber
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
                  {...register(item.key as keyof z.infer<typeof propertyFormSchemaZod>)}
                  error={errors[item.key as keyof z.infer<typeof propertyFormSchemaZod>]?.message}
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
                {...register('kitchen_type')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.kitchen_type?.message}
              />
            </div>

            <div>
              <InputText
                label="Heizung"
                placeholder="z.B. Zentralheizung"
                {...register('heating')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.heating?.message}
              />
            </div>

            <div>
              <InputSelect
                label="Möblierung"
                options={furnishedOptions}
                {...register('furnished')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.furnished?.message}
              />
            </div>

            <div>
              <InputText
                label="Energieeffizienzklasse"
                placeholder="z.B. A+"
                {...register('energy_label')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.energy_label?.message}
              />
            </div>

            <div>
              <Controller
                name="energy_consumption_kwh_m2y"
                control={control}
                render={({ field }) => (
                  <InputNumber
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
                control={control}
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
                  {...register('description')}
                  error={errors.description?.message}
                  className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                />
              </div>

              <div>
                <InputTextarea
                  label="Interne Notizen"
                  placeholder="Nur für interne Verwendung..."
                  rows={3}
                  {...register('notes_internal')}
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
      </form>
    </div>
  );
}
