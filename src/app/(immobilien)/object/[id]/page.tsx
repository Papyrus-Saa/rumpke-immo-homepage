import PropertyGrid from "@/components/properties/property-grid/PropertyGrid";
import { Title } from "@/components/ui/title/Title";
import { Property } from "@/interfaces/property-interface";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


const seedProperties = initialData.properties;


interface Props {
  params: {
    id: Property['gender'];
  }
}




export default  async function ({ params }: Props) {

  const { id } = await params;
  const properties = seedProperties.filter(property => property.gender === id);

  const labels: Record<Property['gender'], string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }


  return (
    <div>
      <Title
        title={`Artículos de ${labels[id]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <PropertyGrid
        properties={properties}
      />
    </div>
  );
}
