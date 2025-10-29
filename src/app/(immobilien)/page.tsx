import PropertyGrid from "@/components/properties/property-grid/PropertyGrid";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";


const properties = initialData.properties;


export default function Home() {
  return (
    <>
      <Title
        title="Aktuelle Immobilien"
        subtitle="Unsere Objekte im Überblick"
        className="mb-5"
      />


      <PropertyGrid
        properties={properties}
      />
    </>
  );
}
