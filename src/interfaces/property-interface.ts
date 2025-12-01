export type PropertyCategory = 'wohnungen' | 'haeuser' | 'luxus' | 'alle-immobilien';
export interface Property {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  title: string;
  type: string;
  gender: 'wohnungen' | 'haeuser' | 'luxus' | 'alle-immobilien';
}
