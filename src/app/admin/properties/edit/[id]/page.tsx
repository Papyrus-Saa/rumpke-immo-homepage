"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { getPropertyById, updateProperty } from "@/utils/admin-client";
import PropertyForm from "@/app/admin/components/properties/components/PropertyForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertyFormSchemaZod } from "@/app/admin/hooks/properties/components/propertyFormSchema.zod";
import { allFields } from "@/app/admin/hooks/properties/components/propertyFormFields";
import { usePropertyForm } from "@/app/admin/hooks/properties/components/usePropertyForm";




function parseEuroNumber(val: any, allowNull = false, isLatLng = false): number | undefined | null {
  if (val === '' && allowNull) return null;
  if (val === null || val === undefined) return allowNull ? null : undefined;

  if (typeof val === 'number' && isFinite(val)) return val;

  if (typeof val !== 'string') return allowNull ? null : undefined;
  if (isLatLng) {
    const num = Number(val);
    if (isNaN(num)) return allowNull ? null : undefined;
    return num;
  }


  const normalized = val.replace(',', '.');
  const num = Number(normalized);
  if (isNaN(num)) return allowNull ? null : undefined;
  return num;
}

function normalizePropertyNumbers(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  const numericFields = [
    'built_area_m2', 'price_amount', 'usable_area_m2', 'plot_area_m2', 'floor', 'floors_total',
    'parking_spaces', 'community_fees', 'deposit', 'energy_consumption_kwh_m2y', 'build_year', 'renovation_year',
    'latitude', 'longitude', 'rooms', 'bedrooms', 'bathrooms'
  ];
  const result = { ...obj };
  for (const key of numericFields) {
    if (key in result) {

      if (key === 'latitude' || key === 'longitude') {
        result[key] = parseEuroNumber(result[key], true, true);
      } else {
        result[key] = parseEuroNumber(result[key]);
      }
    }
  }

  if (typeof result.title !== 'string') {
    result.title = result.title == null ? '' : String(result.title);
  }

  result.title = result.title.trim();
  return result;
}



export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(propertyFormSchemaZod),
    defaultValues: property || {},
    mode: "onChange",
  });


  const { getInputClassName, highlightedField } = usePropertyForm({ allFields, errors: form.formState.errors });


  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    getPropertyById(id)
      .then(data => {
        const normalized = normalizePropertyNumbers(data);
        setProperty(normalized);
        form.reset(normalized);
      })
      .catch(err => setError(err.message || "Error al cargar la vivienda"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: any) => {
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    console.log('DATOS A ENVIAR AL BACKEND:', data);
    if (!id || typeof id !== 'string') {
      setSaveError("Ungültige Immobilien-ID.");
      setSaving(false);
      return;
    }
    try {
      const normalized = normalizePropertyNumbers(data);
      await updateProperty(id, normalized);
      // Refrescar datos desde el backend tras guardar
      const updated = await getPropertyById(id);
      setProperty(normalizePropertyNumbers(updated));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err: any) {
      setSaveError(err.message || "Fehler beim Speichern.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-2 hover:text-primary mb-4 text-xs text-primary hover:underline"
        >
          <IoArrowBackOutline />
          <span>Zurück zur Immobilienübersicht</span>
        </Link>
        <h1 className="text-2xl font-bold text-admin-text-l dark:text-admin-text-d">Immobilie bearbeiten</h1>
        <p className="text-sm text-admin-text-l dark:text-admin-text-d mt-1">
          Bearbeiten Sie die Daten der ausgewählten Immobilie
        </p>
      </div>
      <div className="bg-card-bg-l dark:bg-card-bg-d rounded-lg shadow p-6 border border-admin-border-l dark:border-admin-border-d">
        {loading ? (
          <span className="text-admin-text-l dark:text-admin-text-d">Lade Immobiliendaten...</span>
        ) : error ? (
          <span className="text-error text-center">{error}</span>
        ) : !property ? (
          <span className="text-admin-text-l dark:text-admin-text-d">Immobilie nicht gefunden.</span>
        ) : (
          <>
            <PropertyForm
              form={form}
              onSubmit={handleSubmit}
              loading={saving}
              mode="edit"
              getInputClassName={getInputClassName}
              errors={form.formState.errors}
              highlightedField={highlightedField || undefined}
            />
            {saveSuccess && (
              <div className="mt-4 text-green-600 font-semibold">Erfolgreich gespeichert!</div>
            )}
            {saveError && (
              <div className="mt-4 text-error font-semibold">{saveError}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
