
import PropertyGrid from "@/components/properties/property-grid/PropertyGrid";


import { initialData } from "@/seed/seed";



const properties = initialData.properties;


export default function Home() {
  return (
    <div className="">
      <PropertyGrid properties={properties} />
    </div>
  );
}

