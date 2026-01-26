

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
  children?: React.ReactNode;
}

const PropertiesGrid: React.FC<PropertiesGridProps> = ({ properties, children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
      {children}
    </div>
  );
};

export default PropertiesGrid;
