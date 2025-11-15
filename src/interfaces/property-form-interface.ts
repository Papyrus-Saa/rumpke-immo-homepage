export enum PropertyType {
  HOUSE = "HOUSE",
  APARTMENT = "APARTMENT",
  LAND = "LAND",
  COMMERCIAL = "COMMERCIAL",
  OTHER = "OTHER",
}

export enum PropertyStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  SOLD = "SOLD",
  RENTED = "RENTED",
}

export enum EnergyLabel {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  UNKNOWN = "UNKNOWN",
}

export interface PropertyFormValues {
  agent: string;
  operation: "SELL" | "RENT";
  type: PropertyType;
  address_line: string;
  city: string;
  postal_code: string;
  region: string;
  built_area_m2: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  price_amount: number;
  // Opcionales
  status?: PropertyStatus;
  country?: string;
  latitude?: number;
  longitude?: number;
  usable_area_m2?: number;
  plot_area_m2?: number;
  floor?: number;
  floors_total?: number;
  has_elevator?: boolean;
  parking_spaces?: number;
  garage?: boolean;
  storage_room?: boolean;
  kitchen_type?: string;
  heating?: string;
  air_conditioning?: boolean;
  furnished?: string;
  orientation?: string;
  build_year?: number;
  renovation_year?: number;
  available_from?: string;
  currency?: string;
  price_frequency?: string;
  community_fees?: number;
  property_tax?: number;
  deposit?: number;
  commission_info?: string;
  energy_label?: EnergyLabel;
  energy_consumption_kwh_m2y?: number;
  co2_emissions_kg_m2y?: number;
  energy_certificate_url?: string;
  balcony?: boolean;
  terrace?: boolean;
  garden?: boolean;
  pool?: boolean;
  fireplace?: boolean;
  pets_allowed?: boolean;
  sea_view?: boolean;
  mountain_view?: boolean;
  city_view?: boolean;
  double_glazing?: boolean;
  smart_home?: boolean;
  solar_panels?: boolean;
  floor_heating?: boolean;
  security_door?: boolean;
  cctv?: boolean;
  concierge?: boolean;
  description?: string;
  notes_internal?: string;
  title?: string;
  is_featured?: boolean;
  is_new?: boolean;
}
