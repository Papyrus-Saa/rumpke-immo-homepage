


import PropertiesGrid from '@/components/properties/PropertiesGrid';


import { OperationType } from '@/store/ui/ui-store';

export default async function ImmobilienPage() {
  const res = await fetch('http://localhost:3000/property', { cache: 'no-store' });
  if (!res.ok) {
    return <div className="p-4 font-semibold text-error" >Eigenschaften konnten nicht geladen werden.</div>;
  }
  let properties = await res.json();
  let error = false;
  try {
    const res = await fetch('http://localhost:3000/property', { cache: 'no-store' });
    if (!res.ok) {
      error = true;
    } else {
      properties = await res.json();
      properties = properties.map((p: any) => ({
        ...p,
        operationType:
          p.operation === 'SELL'
            ? OperationType.SELL
            : p.operation === 'RENT'
              ? OperationType.RENT
              : undefined,
        image: p.main_image || '',
        price: p.price_amount ? `${Number(p.price_amount).toLocaleString('de-DE')} €` : undefined,
        title: p.title,
        slug: p.slug,
        id: p.id,
      }));
    }
  } catch {
    error = true;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <span className="text-lg font-semibold text-error">Eigenschaften konnten nicht geladen werden.</span>
      </div>
    );
  }

  if (!properties.length) {
    return <Loader />;
  }

  return (
    <main className="px-2 py-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Alle Immobilien</h1>
      <PropertiesGrid properties={properties} />
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


