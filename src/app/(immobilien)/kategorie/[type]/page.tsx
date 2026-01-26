import PropertiesGrid from '@/components/properties/PropertiesGrid';
import { OperationType } from '@/store/ui/ui-store';
import { Title } from '@/components/ui/title/Title';

const typeMap: Record<string, string> = {
  haus: 'Häuser',
  grundstueck: 'Grundstücke',
  gewerbe: 'Gewerbe',
  wohnung: 'Wohnungen',
  garage: 'Garagen',
};

export default async function KategorieTypePage({ params }: { params: { type: string } }) {
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
      properties = properties.filter((p: any) =>
        p.status === 'PUBLISHED' || p.status === 'RESERVED' || p.status === 'SOLD' || p.status === 'RENTED'
      ).map((p: any) => ({
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
        available_from: p.available_from,
        deposit: p.deposit,
        furnished: p.furnished,
        type: p.type,
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

  // Filtrar propiedades por tipo de la ruta
  const type = params.type.toLowerCase();
  const title = `Alle ${typeMap[type] || type}`;
  const filteredProperties = properties.filter((p: any) => (p.type || '').toLowerCase() === type);

  if (!filteredProperties.length) {
    return <Loader />;
  }

  return (
    <main className="px-2 py-6">
      <Title
        title="Willkommen bei Rumpke Immobilien"
        className="text-center text-3xl md:text-4xl font-bold text-black dark:text-white"
      />
      <div className="text-center text-xl md:text-2xl font-medium text-black dark:text-white mt-1 mb-6">
        – Mehr als nur 4 Wände –
      </div>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <PropertiesGrid properties={filteredProperties} />
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
