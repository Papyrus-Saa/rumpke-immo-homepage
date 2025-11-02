

export interface Property {
    //todo _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: squareMeters[];
    slug: string;
    tags: string[];
    title: string;
    type: Typ;
    gender: PropertyCategory;
}

export type PropertyCategory = 'wohnung'|'haus'|'luxus'|'auf-karte-erkunden';
export type squareMeters = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Typ = 'shirts'|'pants'|'hoodies'|'hats';
