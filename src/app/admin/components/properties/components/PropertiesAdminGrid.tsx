import React, { useState } from "react";
import { PropertyAdminPanel } from "@/interfaces/PropertyAdminPanel";
import PropertyAdminCard from "./PropertyAdminCard";

interface PropertiesAdminGridProps {
  properties: PropertyAdminPanel[];

}


const PropertiesAdminGrid: React.FC<PropertiesAdminGridProps> = ({ properties }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full grid grid-cols-2 gap-4 relative">
      {properties.map((property, idx) => (
        <PropertyAdminCard
          key={property.title + property.address_line}
          property={property}
          expanded={expandedIndex === idx}
          onExpand={() => setExpandedIndex(idx)}
          onCloseExpand={() => setExpandedIndex(null)}
        />
      ))}

      {expandedIndex !== null && (
        <div className="fixed inset-0 bg-white opacity-50 dark:bg-black dark:opacity-70
        0 z-40" />
      )}
    </div>
  );
};

export default PropertiesAdminGrid;
