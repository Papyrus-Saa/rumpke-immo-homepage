
"use client";


import PropertyCard from './PropertyCard';
import { OperationType } from '@/store/ui/ui-store';

interface Property {
  id: string;
  slug: string;
  title: string;
  image: string;
  price?: string;
  operationType: OperationType;
}


interface PropertiesGridProps {
  properties: Property[];
  onSelectProperty?: (property: any) => void;
  category?: string;
  children?: React.ReactNode;
}



const PropertiesGrid: React.FC<PropertiesGridProps> = ({ properties, onSelectProperty, children }) => {
  const title = 'Immobilienangebote';
  const subtitle = 'Entdecken Sie unsere aktuellen Objekte – sorgfältig ausgewählt für Ihre Wünsche. Finden Sie Ihr neues Zuhause oder Ihre nächste Investition aus unserem vielfältigen Portfolio.';
  return (
    <>
      <div className="">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 px-2 sm:px-0">{title}</h2>
        <p className="px-2 sm:px-0 mb-6 dark:text-admin-text-d text-admin-text-l mt-2">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:px-1 mb-20 border-5 border-secondary dark:border-secondary-dark p-2 rounded-lg">
        {properties.map((property) => (
          <a
            key={property.id}
            href={`/object/${property.slug}`}
            className="block"
            tabIndex={0}
          >
            <PropertyCard
              property={property}
            // No onClick necesario, navegación por <a>
            />
          </a>
        ))}
        {children}
      </div>
    </>
  );
};

export default PropertiesGrid;
