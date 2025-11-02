'use client';

import { Property } from "@/interfaces/property-interface"
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';


interface Props {
  property: Property;
}

const PropertyGridItem = ({ property }: Props) => {


  const [displayImage, setDisplayImage] = useState(property.images[0]);
  return (
    <div className="fade-in sm:w-40 lg:w-60">
      <Image
        src={`/properties/${displayImage}`}
        alt={property.title}
        width={500}
        height={500}
        className="w-full h-full object-cover rounded"
        loading="eager"
        onMouseEnter={() => setDisplayImage(property.images[1])}
        onMouseLeave={() => setDisplayImage(property.images[0])}
      />


      <div className="py-2 flex flex-col">
        <Link href={`/object/${property.slug}`}
          className="mb-2 hover:text-blue-700 hover:underline truncate">
          {property.title}
        </Link>
        <div className="text-primary  font-bold">
          {property.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </div>
        {/* <span>{property.location}</span>
        <span>{property.squareMeters}</span> */}
      </div>
    </div>
  )
}

export default PropertyGridItem
