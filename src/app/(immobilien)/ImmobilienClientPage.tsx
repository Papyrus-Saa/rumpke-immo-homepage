"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import PropertiesGrid from '@/components/properties/PropertiesGrid';
import { useRouter } from 'next/navigation';


import { Title } from '@/components/ui/title/Title';
import LeadForm from '@/components/form/LeadForm';
import ClientOnly from '@/components/form/ClientOnly';
import PersonalServiceCard from '@/components/personal-service-card/PersonalServiceCard';
import ContactAside from '@/components/form/ContactAside';
import Button from '@/components/ui/Button';
import TargetAudienceSection from '@/components/target-audience-section/TargetAudienceSection';
import WhyChooseRumpke from '@/components/why-choose-rumpke/WhyChooseRumpke';
import ServicesSection from '@/components/services-section/ServicesSection';


export default function ImmobilienClientPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

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
    <main className="">
      <Title
        title="Immobilien. Persönlich. Durchdacht. "
        className="px-1 sm:px-0 mb-6 text-center text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
      />
      <Title
        title="Wir begleiten Sie beim Kauf, Verkauf und
                der Vermietung von Immobilien – persönlich, transparent und mit regionaler Expertise."
        className="px-2 sm:px-0 mb-6 dark:text-admin-text-d text-admin-text-l sm:w-[70%] mx-auto sm:text-center text-base sm:text-lg font-medium"
      />

      <div className='flex w-fit mx-auto gap-4 mb-12'>
        <Button
          variant="secondary"
          className="mb-8 mx-auto block"
          onClick={() => router.push('/contact?subject=Immobilienberatung')}
        >
          Kostenlose Bewertung
        </Button>
        <Button
          variant="primary"
          className="mb-8 mx-auto block"
          onClick={() => router.push('/kontakt')}
        >
          Kontakt aufnehmen
        </Button>
      </div>

      <TargetAudienceSection />

      <h1 className="text-xl sm:text-2xl font-bold mb-6 px-2 sm:px-0">Alle Immobilien</h1>
      <PropertiesGrid
        properties={properties}
        onSelectProperty={(property) => {
          if (property && property.slug) {
            router.push(`/object/${property.slug}`);
          }
        }}
      />
      <WhyChooseRumpke />
      <ServicesSection />
      <PersonalServiceCard />
      <div className="grid gap-2 lg:grid-cols-2">
        <ClientOnly>
          <LeadForm type="CONTACT" propertyId="" source="web" />
        </ClientOnly>
        <div className="">
          <ContactAside />
        </div>
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
