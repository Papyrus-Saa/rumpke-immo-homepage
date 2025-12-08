import * as yup from 'yup';

export const propertyFormSchema = yup.object().shape({
  deposit: yup.number().typeError('Kaution muss eine Zahl sein').positive('Muss positiv sein'),
  build_year: yup.number().typeError('Baujahr muss eine Zahl sein').integer('Muss ganzzahlig sein'),
  category: yup.string().oneOf(['haus', 'wohnung', 'gewerbe', 'grundstueck', 'sonstige'], 'Ungültige Kategorie').required('Kategorie ist erforderlich'),
  agent: yup.string().required('Makler ist erforderlich'),
  owner: yup.string().required('Eigentümer ist erforderlich'),
  operation: yup.string().oneOf(['SELL', 'RENT'], 'Ungültige Operation').required('Operation ist erforderlich'),
  type: yup.string().oneOf(['haus', 'wohnung', 'gewerbe', 'grundstueck', 'sonstige'], 'Ungültiger Typ').required('Typ ist erforderlich'),
  status: yup.string().oneOf(['PUBLISHED', 'RESERVED', 'SOLD', 'RENTED', 'DRAFT', 'HIDDEN'], 'Ungültiger Status').required('Status ist erforderlich'),
  address_line: yup.string().required('Adresse ist erforderlich'),
  city: yup.string().required('Stadt ist erforderlich'),
  postal_code: yup.string().required('Postleitzahl ist erforderlich'),
  built_area_m2: yup
    .number()
    .typeError('Wohnfläche muss eine Zahl sein')
    .positive('Muss positiv sein')
    .required('Wohnfläche ist erforderlich'),
  rooms: yup
    .number()
    .typeError('Zimmer muss eine Zahl sein')
    .positive('Muss positiv sein')
    .integer('Muss ganzzahlig sein')
    .required('Zimmer sind erforderlich'),
  bedrooms: yup
    .number()
    .typeError('Schlafzimmer muss eine Zahl sein')
    .positive('Muss positiv sein')
    .integer('Muss ganzzahlig sein')
    .required('Schlafzimmer sind erforderlich'),
  bathrooms: yup
    .number()
    .typeError('Badezimmer muss eine Zahl sein')
    .positive('Muss positiv sein')
    .integer('Muss ganzzahlig sein')
    .required('Badezimmer sind erforderlich'),
  price_amount: yup
    .number()
    .typeError('Preis muss eine Zahl sein')
    .positive('Muss positiv sein')
    .required('Preis ist erforderlich'),
  currency: yup.string().required('Währung ist erforderlich'),
  main_image: yup.string().url('Muss eine gültige URL sein').required('Hauptbild ist erforderlich'),
  title: yup.string().required('Titel ist erforderlich'),

  // Opcionales
  country: yup.string(),
  latitude: yup.number().typeError('Breitengrad muss eine Zahl sein'),
  longitude: yup.number().typeError('Längengrad muss eine Zahl sein'),
  usable_area_m2: yup.number().typeError('Nutzfläche muss eine Zahl sein'),
  plot_area_m2: yup.number().typeError('Grundstücksfläche muss eine Zahl sein'),
  floor: yup.number().typeError('Etage muss eine Zahl sein').integer('Muss ganzzahlig sein'),
  floors_total: yup.number().typeError('Etagen gesamt muss eine Zahl sein').integer('Muss ganzzahlig sein'),
  has_elevator: yup.boolean(),
  parking_spaces: yup.number().typeError('Parkplätze muss eine Zahl sein').integer('Muss ganzzahlig sein'),
  garage: yup.boolean(),
  storage_room: yup.boolean(),
  kitchen_type: yup.string(),
  heating: yup.string(),
  air_conditioning: yup.boolean(),
  furnished: yup.string(),
  renovation_year: yup.number().typeError('Renovierungsjahr muss eine Zahl sein').integer('Muss ganzzahlig sein'),
  available_from: yup.date(),
  community_fees: yup.number().typeError('Nebenkosten muss eine Zahl sein').positive('Muss positiv sein'),
  commission_info: yup.string(),
  energy_label: yup.string(),
  energy_consumption_kwh_m2y: yup.number().typeError('Energieverbrauch muss eine Zahl sein'),
  balcony: yup.boolean(),
  terrace: yup.boolean(),
  garden: yup.boolean(),
  pool: yup.boolean(),
  fireplace: yup.boolean(),
  sea_view: yup.boolean(),
  mountain_view: yup.boolean(),
  city_view: yup.boolean(),
  solar_panels: yup.boolean(),
  floor_heating: yup.boolean(),
  concierge: yup.boolean(),
  description: yup.string(),
  notes_internal: yup.string(),
  is_new: yup.boolean(),
});
