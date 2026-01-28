"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertiesGrid from '@/components/properties/PropertiesGrid';

import { Title } from '@/components/ui/title/Title';
import LeadForm from '@/components/form/LeadForm';
import ClientOnly from '@/components/form/ClientOnly';

export default function ImmobilienClientPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);


  useEffect(() => {
    console.log('selectedProperty:', selectedProperty);
  }, [selectedProperty]);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch('http://localhost:3000/property', { cache: 'no-store' });
        if (!res.ok) throw new Error('Fetch error');
        let data = await res.json();
        data = data.filter((p: any) =>
          p.status === 'PUBLISHED' || p.status === 'RESERVED' || p.status === 'SOLD' || p.status === 'RENTED'
        ).map((p: any, idx: number) => ({
          ...p,
          operationType:
            p.operation === 'SELL'
              ? 'SELL'
              : p.operation === 'RENT'
                ? 'RENT'
                : undefined,
          image: p.main_image || '',
          images: [
            `/properties/fake${(idx % 3) + 1}.jpg`,
            `/properties/fake${((idx + 1) % 3) + 1}.jpg`,
            `/properties/fake${((idx + 2) % 3) + 1}.jpg`,
          ],
          price: p.price_amount ? `${Number(p.price_amount).toLocaleString('de-DE')} €` : undefined,
          title: p.title,
          slug: p.slug,
          id: p.id,
          available_from: p.available_from,
          deposit: p.deposit,
          furnished: p.furnished,
        }));

        if (type) {
          data = data.filter((p: any) => (p.type || '').toLowerCase() === type.toLowerCase());
        }
        setProperties(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, [type]);

  if (loading) return <Loader />;
  if (error) return <div className="p-4 font-semibold text-error">Eigenschaften konnten nicht geladen werden.</div>;

  return (
    <main className="px-2 py-6">
      <Title
        title="Willkommen bei Rumpke Immobilien"
        className="text-center text-3xl md:text-4xl font-bold text-black dark:text-white"
      />
      <div className="text-center text-xl md:text-2xl font-medium text-black dark:text-white mt-1 mb-6">
        – Mehr als nur 4 Wände –
      </div>
      <h1 className="text-2xl font-bold mb-6">Alle Immobilien</h1>
      <PropertiesGrid
        properties={properties}
        onSelectProperty={setSelectedProperty}
      />
      <div className="mt-12">
        <ClientOnly>
          <LeadForm type="CONTACT" propertyId="" source="web" />
        </ClientOnly>
      </div>
    </main>
  );
}

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
    </div>
  );
}
