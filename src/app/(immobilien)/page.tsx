
import PropertyGrid from "@/components/properties/property-grid/PropertyGrid";


import { initialData } from "@/seed/seed";



const properties = initialData.properties;


export default function Home() {
  return (
    <div className="px-2 xl:px-32">
      <PropertyGrid properties={properties} />
    </div>
  );
}

