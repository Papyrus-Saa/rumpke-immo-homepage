import Link from "next/link";
import { IoAddOutline } from "react-icons/io5";

export default function PropertiesList({ properties = [] }: { properties: any[] }) {
  if (properties.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 dark:bg-card-secondary-bg-d bg-card-secondary-bg-l rounded-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Keine Immobilien vorhanden.</p>
      </div>
    );
  }

  const PropertyCard = require('./PropertyCard').default;

  return (
    <div className="flex flex-col items-center gap-6">
      {properties.map((property, idx) => (
        <PropertyCard key={idx} {...property} />
      ))}
    </div>
  );
}
