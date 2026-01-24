'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertyFormSchemaZod } from '@/app/admin/hooks/properties/components/propertyFormSchema.zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoArrowBackOutline, IoSaveOutline, IoPricetagOutline, IoInformationCircleOutline } from 'react-icons/io5';
import { usePropertyForm } from '@/app/admin/hooks/properties/components/usePropertyForm';
import QuickFieldSearchInput from '@/app/admin/hooks/properties/components/QuickFieldSearchInput';
import { useUIStore } from '@/store/ui/ui-store';
import { useEffect } from 'react';

import {
  allFields,
  furnishedOptions,
} from '@/app/admin/hooks/properties/components/propertyFormFields';
import z from 'zod';
import PropertyForm from '../../components/properties/components/PropertyForm';
import { createProperty } from '@/utils/admin-client';

export default function NewPropertyPage() {
  if (typeof window !== 'undefined' && !localStorage.getItem('admin_token')) {
    window.location.replace('/admin/login');
    return null;
  }

  const operationType = useUIStore(s => s.operationType);
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!operationType) {
      router.replace('/admin/properties');
    }
  }, [operationType, router]);

  const form = useForm<z.infer<typeof propertyFormSchemaZod>>({
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
  } = usePropertyForm({ allFields, errors: form.formState.errors });

  const onSubmit = async (rawData: z.infer<typeof propertyFormSchemaZod>) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {

      const dataToSend = {
        ...rawData,
        operation: operationType,
      };
      await createProperty(dataToSend);

      setSuccess('Immobilie erfolgreich erstellt!');
      setTimeout(() => router.push('/admin/properties'), 1500);
    } catch (err: any) {
      if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        err.response.data.errors.forEach((error: any, index: number) => {
          if (error.field && error.message) {
            form.setError(error.field as any, { type: 'manual', message: error.message });
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

      <PropertyForm
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
        getInputClassName={getInputClassName}
        errors={form.formState.errors}
      />
    </div>
  );
}
