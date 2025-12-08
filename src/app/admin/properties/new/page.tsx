'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { propertyFormSchema } from '@/hooks/property/propertyFormSchema';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { IoArrowBackOutline, IoSaveOutline, IoHomeOutline, IoLocationOutline, IoPricetagOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { PropertyAdminPanel } from '@/interfaces/PropertyAdminPanel';


import InputSelect from '../../components/properties/components/InputSelect';
import InputDate from '../../components/properties/components/InputDate';
import InputTextarea from '../../components/properties/components/InputTextarea';
import CheckboxBoolean from '../../components/properties/components/CheckboxBoolean';
import { usePropertyForm } from '@/hooks/property/usePropertyForm';
import InputNumber from '../../components/properties/components/InputNumber';
import PropertyBasicInfoSection from '../../components/properties/components/PropertyBasicInfoSection';
import PropertyLocationSection from '../../components/properties/components/PropertyLocationSection';
import InputText from '../../components/properties/components/InputText';


import {
  allFields,
  furnishedOptions,
} from '@/hooks/property/propertyFormFields';



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
  } = useForm<InferType<typeof propertyFormSchema>>({
    resolver: yupResolver(propertyFormSchema),
    defaultValues: {
      operation: 'SELL',
      type: 'wohnung',
      status: 'DRAFT',
      currency: 'EUR',
      country: 'Deutschland',
      category: 'wohnung', // agrega un valor por defecto para category si es obligatorio
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




  // Línea 191: Handler de submit
  const onSubmit = async (data: InferType<typeof propertyFormSchema>) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // TODO: Implementar createProperty en admin-client.ts
      // await createProperty(data);

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

      {/* Línea 248-295: Barra de búsqueda rápida */}
      <div className="mb-6 relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchResults.length > 0) {
                scrollToField(searchResults[0].key);
              }
            }}
            placeholder="Feld schnell finden (z.B. Abstellraum, Preis, Adresse...)"
            className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          )}
        </div>

        {/* Línea 279-295: Resultados de búsqueda */}
        {searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((result) => (
              <button
                key={result.key}
                type="button"
                onClick={() => scrollToField(result.key)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-neutral-700 text-admin-text-l dark:text-admin-text-d border-b border-gray-200 dark:border-neutral-700 last:border-b-0"
              >
                {result.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Línea 297: Toast de error global */}
      {error && (
        <div className="mb-6 p-4 bg-error/10 dark:bg-error/20 border border-error dark:border-error rounded-lg">
          <p className="text-sm text-error dark:text-error">{error}</p>
        </div>
      )}

      {/* Línea 304: Toast de éxito */}
      {success && (
        <div className="mb-6 p-4 bg-success/10 dark:bg-success/20 border border-success dark:border-success rounded-lg">
          <p className="text-sm text-success dark:text-success">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-6">
        {/* Sección 1 - Grundinformationen (Pflichtfelder) */}
        <PropertyBasicInfoSection
          register={register}
          errors={errors}
          getInputClassName={getInputClassName}
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
              <InputNumber
                label="Nebenkosten"
                placeholder="150"
                {...register('community_fees')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.community_fees?.message}
              />
            </div>

            <div>
              <InputNumber
                label="Kaution"
                placeholder="3000"
                {...register('deposit')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.deposit?.message}
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
              <InputNumber
                label="Nutzfläche (m²)"
                placeholder="100"
                {...register('usable_area_m2')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.usable_area_m2?.message}
              />
            </div>

            <div>
              <InputNumber
                label="Grundstücksfläche (m²)"
                placeholder="200"
                {...register('plot_area_m2')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.plot_area_m2?.message}
              />
            </div>

            <div>
              <InputNumber
                label="Etage"
                placeholder="2"
                {...register('floor')}
                error={errors.floor?.message}
              />
            </div>

            <div>
              <InputNumber
                label="Etagen gesamt"
                placeholder="5"
                {...register('floors_total')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.floors_total?.message}
              />
            </div>

            <div>
              <InputNumber
                label="Parkplätze"
                placeholder="1"
                {...register('parking_spaces')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.parking_spaces?.message}
              />
            </div>

            <div>
              <InputNumber
                label="Baujahr"
                placeholder="2020"
                {...register('build_year')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.build_year?.message}
              />
            </div>

            <div>
              <InputNumber
                label="Renovierungsjahr"
                placeholder="2023"
                {...register('renovation_year')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.renovation_year?.message}
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
                  {...register(item.key as keyof InferType<typeof propertyFormSchema>)}
                  error={errors[item.key as keyof InferType<typeof propertyFormSchema>]?.message}
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
              <InputNumber
                label="Energieverbrauch (kWh/m²/Jahr)"
                placeholder="80"
                {...register('energy_consumption_kwh_m2y')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.energy_consumption_kwh_m2y?.message}
              />
            </div>

            <div>
              <InputDate
                label="Verfügbar ab"
                {...register('available_from')}
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                error={errors.available_from?.message}
              />
            </div>
          </div>
        </div>

        {/* Sección 5 - Medien & Beschreibung */}
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
      </form>
    </div>
  );
}
