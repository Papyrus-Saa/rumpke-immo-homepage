import React from "react";
import { PropertyAdminPanel } from "@/interfaces/PropertyAdminPanel";
import PropertyAdminCard from "./PropertyAdminCard";

interface PropertiesAdminGridProps {
  properties: PropertyAdminPanel[];
}

const PropertiesAdminGrid: React.FC<PropertiesAdminGridProps> = ({ properties }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {properties.map((property) => (
        <PropertyAdminCard key={property.title + property.address_line} property={property} />
      ))}
    </div>
  );
};

export default PropertiesAdminGrid;
