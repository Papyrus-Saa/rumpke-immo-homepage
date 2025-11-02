import PropertyGrid from "@/components/properties/property-grid/PropertyGrid";
import { Title } from "@/components/ui/title/Title";
import { Property, PropertyCategory } from "@/interfaces/property-interface";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


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
    'wohnung': 'Wohnungen',
    'haus': 'Häuser',
    'luxus': 'Luxusimmobilien',
    'auf-karte-erkunden': 'Alle Immobilien'
  }


  return (
    <div className="">
      <Title
        title={`${labels[id]}`}
        subtitle=""
        className="mb-2 bg-primary dark:bg-primary-dark text-white px-3 rounded"
      />

      <PropertyGrid
        properties={properties}
      />
    </div>
  );
}
