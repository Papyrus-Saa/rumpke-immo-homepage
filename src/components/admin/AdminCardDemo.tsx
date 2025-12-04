import React from "react";
import PropertyAdminCard from "./PropertyAdminCard";
import { PropertyAdminPanel } from "@/interfaces/PropertyAdminPanel";

const mockProperty1: PropertyAdminPanel = {
  agent: "Max Mustermann",
  owner: "Erika Mustermann",
  operation: "SELL",
  type: "haus",
  status: "RESERVED",
  address_line: "Musterstraße 1",
  city: "Berlin",
  postal_code: "10115",
  built_area_m2: 120,
  rooms: 5,
  bedrooms: 3,
  bathrooms: 2,
  price_amount: 450000,
  currency: "EUR",
  main_image: "https://placehold.co/96x96",
};

const mockProperty2: PropertyAdminPanel = {
  agent: "Anna Beispiel",
  owner: "Max Beispiel",
  operation: "RENT",
  type: "wohnung",
  status: "PUBLISHED",
  address_line: "Beispielweg 2",
  city: "Hamburg",
  postal_code: "20095",
  built_area_m2: 80,
  rooms: 3,
  bedrooms: 2,
  bathrooms: 1,
  price_amount: 1200,
  currency: "EUR",
  main_image: "https://placehold.co/96x96",
};

const AdminCardDemo: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center", width: "100%" }}>
    <PropertyAdminCard property={mockProperty1} />
    <PropertyAdminCard property={mockProperty2} />
  </div>
);

export default AdminCardDemo;
