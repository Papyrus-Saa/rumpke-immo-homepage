import { Property } from "@/interfaces/property-interface"
import PropertyGridItem from "./PropertyGridItem"



interface Props {
  properties: Property[]
}

const PropertyGrid = ({ properties }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
  {
      properties.map(property => (
        <PropertyGridItem
         key={property.slug}
         property={property} />
      ))
  }
    </div>
  )
}

export default PropertyGrid
