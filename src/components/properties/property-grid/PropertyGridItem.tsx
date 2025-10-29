import { Property } from "@/interfaces/property-interface"
import Image from "next/image";
import Link from "next/link";


interface Props {
  property: Property;
}

const PropertyGridItem = ({ property }: Props) => {
  return (
    <div className="fade-in w-fit">
      <Image
        src={`/properties/${property.images[0]}`}
        alt={property.title}
        width={400}
        height={400}
        className=""
        loading="eager"
      />


      <div className="py-2 flex flex-col">
        <Link href={`/object/${property.slug}`} className="font-semibold text-lg mb-2 hover:underline">
          {property.title}
        </Link>
        <div className="text-primary   font-bold">
          {property.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </div>
      </div>
    </div>
  )
}

export default PropertyGridItem
