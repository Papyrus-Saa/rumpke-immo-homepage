

export const propertyOptionalGroups = [
  {
    title: "Geografische Angaben",
    fields: [
      { key: "country", label: "Land" },
      { key: "latitude", label: "Breitengrad" },
      { key: "longitude", label: "Längengrad" },
      { key: "plot_area_m2", label: "Grundstücksfläche (m²)" },
      { key: "usable_area_m2", label: "Nutzfläche (m²)" },
      { key: "city_view", label: "Stadtblick" },
      { key: "sea_view", label: "Meerblick" },
      { key: "mountain_view", label: "Bergblick" }
    ]
  },
  {
    title: "Technische Angaben",
    fields: [
      { key: "floor", label: "Etage" },
      { key: "floors_total", label: "Etagen gesamt" },
      { key: "build_year", label: "Baujahr" },
      { key: "renovation_year", label: "Renovierungsjahr" },
      { key: "available_from", label: "Verfügbar ab" },
      { key: "energy_label", label: "Energieklasse" },
      { key: "energy_consumption_kwh_m2y", label: "Energieverbrauch kWh/m²/Jahr" },
      { key: "solar_panels", label: "Solaranlage" },
      { key: "floor_heating", label: "Fußbodenheizung" },
      { key: "heating", label: "Heizung" },
      { key: "air_conditioning", label: "Klimaanlage" }
    ]
  },
  {
    title: "Ausstattung & Komfort",
    fields: [
      { key: "has_elevator", label: "Aufzug" },
      { key: "parking_spaces", label: "Parkplätze" },
      { key: "garage", label: "Garage" },
      { key: "storage_room", label: "Abstellraum" },
      { key: "kitchen_type", label: "Küchentyp" },
      { key: "furnished", label: "Möbliert" },
      { key: "pool", label: "Pool" },
      { key: "balcony", label: "Balkon" },
      { key: "terrace", label: "Terrasse" },
      { key: "garden", label: "Garten" },
      { key: "fireplace", label: "Kamin" },
      { key: "concierge", label: "Concierge" }
    ]
  },
  {
    title: "Finanzen & Sonstiges",
    fields: [
      { key: "community_fees", label: "Gemeinschaftskosten" },
      { key: "deposit", label: "Kaution" },
      { key: "commission_info", label: "Provision" },
      { key: "description", label: "Beschreibung" },
      { key: "notes_internal", label: "Interne Bemerkung" },
      { key: "is_new", label: "Neubau" }
    ]
  }
];
