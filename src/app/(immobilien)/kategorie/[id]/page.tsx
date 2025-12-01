

import PropertyGrid from "@/components/properties/property-grid/PropertyGrid";
import { Title } from "@/components/ui/title/Title";
import { PropertyCategory } from "@/interfaces/property-interface";

import { initialData } from "@/seed/seed";



const seedProperties = initialData.properties;


interface Props {
  params: {
    id: PropertyCategory;
  }
}

export default async function ({ params }: Props) {

  const { id } = await params;
  const properties = seedProperties.filter(property => property.gender === id);

  const labels: Record<PropertyCategory, string> = {
    'wohnungen': 'Wohnungenen',
    'haeuser': 'Häuser',
    'luxus': 'Luxusimmobilien',
    'alle-immobilien': 'Alle Immobilien',
  }


  return (
    <div className="">
      <Title
        title={`${labels[id]}`}
        subtitle=""
        className="mb-1 bg-primary dark:bg-primary-dark text-white px-3 sm:rounded w-full"
      />

      <PropertyGrid
        properties={properties}
      />
    </div>
  );
}
