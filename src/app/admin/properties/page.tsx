'use client';

import PropertiesAdminGrid from "@/components/admin/PropertiesAdminGrid";
import { PropertyAdminPanel } from "@/interfaces/PropertyAdminPanel";
import Link from "next/link";
import { IoHomeOutline, IoAddOutline } from "react-icons/io5";

const propertiesAdmin: PropertyAdminPanel[] = [
  {
    agent: "Max Mustermann",
    owner: "Erika Mustermann",
    operation: "SELL",
    type: "haus",
    status: "PUBLISHED",
    address_line: "Musterstraße 1",
    city: "Berlin",
    postal_code: "10115",
    built_area_m2: 120,
    rooms: 5,
    bedrooms: 3,
    bathrooms: 2,
    price_amount: 450000,
    currency: "EUR",
    main_image: "",
    title: "Schönes Einfamilienhaus",
  },
  {
    agent: "Anna Beispiel",
    owner: "Max Beispiel",
    operation: "RENT",
    type: "wohnung",
    status: "RESERVED",
    address_line: "Beispielweg 5",
    city: "Hamburg",
    postal_code: "20095",
    built_area_m2: 80,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    price_amount: 1200,
    currency: "EUR",
    main_image: "",
    title: "Moderne Wohnung im Zentrum",
  },
];

export default function PropertiesPage() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">Immobilien</h1>
        <Link href="/admin/properties/new" className="mb-4 text-primary hover:underline text-xs flex items-center justify-center dark:bg-card-bg-d bg-card-bg-l dark:hover:bg-Bghover-d hover:bg-Bghover-l px-3 py-2 rounded-md">
          <span className="flex items-center gap-1">
            <IoAddOutline className="text-base" />
            <IoHomeOutline className="text-base" />
          </span>
        </Link>
      </div>
      <PropertiesAdminGrid properties={propertiesAdmin} />
    </div>
  );
}


