import { Property } from "@/interfaces/property-interface"
import PropertyGridItem from "./PropertyGridItem"
import Input from "@/components/ui/input/Input"




interface Props {
  properties: Property[]
}

const PropertyGrid = ({ properties }: Props) => {
  return (
    <div className="md:p-2">
      <Input />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:place-items-center">
        {properties.map(property => (
          <div key={property.slug} className="">
            <PropertyGridItem property={property} />
          </div>
        ))}
        {properties.map(property => (
          <PropertyGridItem
            key={property.slug}
            property={property}
          />
        ))}
      </div>
    </div>
  )
}

export default PropertyGrid
