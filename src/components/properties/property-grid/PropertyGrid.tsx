import { Property } from "@/interfaces/property-interface"
import PropertyGridItem from "./PropertyGridItem"
import Input from "@/components/ui/input/Input"
import { Title } from "@/components/ui/title/Title"




interface Props {
  properties: Property[]
}

const PropertyGrid = ({ properties }: Props) => {
  return (
    <div className="">
      <Title
        title="Wilkommen bei Rumpke Immobilien"
        className="bg-primary dark:bg-primary-dark text-white px-3 rounded mb-2"
      />
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
