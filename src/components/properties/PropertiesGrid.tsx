
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
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">{title}</h2>
        <p className="text-base md:text-lg text-card-text-l dark:text-card-text-d mt-2">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={() => onSelectProperty?.(property)}
          />
        ))}
        {children}
      </div>
    </>
  );
};

export default PropertiesGrid;
