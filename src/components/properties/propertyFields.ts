
export const typeOptions = [
  { value: "APARTMENT", label: "Apartment" },
  { value: "HOUSE", label: "Haus" },
  { value: "VILLA", label: "Villa" },
  { value: "PLOT", label: "Grundstück" },
  { value: "DUPLEX", label: "Duplex" },
  { value: "PENTHOUSE", label: "Penthouse" },
  { value: "STUDIO", label: "Studio" },
  { value: "OFFICE", label: "Büro" },
];

export const operationOptions = [
  { value: "SELL", label: "Verkauf" },
  { value: "RENT", label: "Miete" },
];

export const statusOptions = [
  { value: "PUBLISHED", label: "Veröffentlicht" },
  { value: "RESERVED", label: "Reserviert" },
  { value: "SOLD", label: "Verkauft" },
  { value: "RENTED", label: "Vermietet" },
  { value: "DRAFT", label: "Entwurf" },
  { value: "HIDDEN", label: "Versteckt" },
];

export const booleanPropertyFields = [
  { name: "is_featured", label: "Hervorgehoben" },
  { name: "is_new", label: "Neu" },
  { name: "has_elevator", label: "Aufzug" },
  { name: "garage", label: "Garage" },
  { name: "storage_room", label: "Abstellraum" },
  { name: "air_conditioning", label: "Klimaanlage" },
  { name: "balcony", label: "Balkon" },
  { name: "terrace", label: "Terrasse" },
  { name: "garden", label: "Garten" },
  { name: "pool", label: "Pool" },
  { name: "fireplace", label: "Kamin" },
  { name: "pets_allowed", label: "Haustiere erlaubt" },
  { name: "sea_view", label: "Meerblick" },
  { name: "mountain_view", label: "Bergblick" },
  { name: "city_view", label: "Stadtblick" },
  { name: "double_glazing", label: "Doppelverglasung" },
  { name: "smart_home", label: "Smart Home" },
  { name: "solar_panels", label: "Solaranlage" },
  { name: "floor_heating", label: "Fußbodenheizung" },
  { name: "security_door", label: "Sicherheitstür" },
  { name: "cctv", label: "Videoüberwachung" },
  { name: "concierge", label: "Concierge" },
];


export const optionalPropertyFields = [
  { name: "kitchen_type", label: "Küche", type: "text" },
  { name: "heating", label: "Heizung", type: "text" },
  { name: "furnished", label: "Möbliert", type: "text" },
  { name: "orientation", label: "Ausrichtung", type: "text" },
  { name: "commission_info", label: "Provision Info", type: "text" },
  { name: "energy_certificate_url", label: "Energiezertifikat URL", type: "text" },
  { name: "available_from", label: "Verfügbar ab", type: "date" },
  { name: "currency", label: "Währung", type: "text" },
  { name: "price_frequency", label: "Preisintervall", type: "text" },
  { name: "seo_title", label: "SEO Titel", type: "text" },
  { name: "seo_description", label: "SEO Beschreibung", type: "text" },
];

export const energyLabelOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "G", label: "G" },
];
