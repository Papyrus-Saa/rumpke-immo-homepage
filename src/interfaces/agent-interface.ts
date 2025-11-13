export interface Agent {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  mobile?: string;
  languages: string[];
  photo_url?: string;
  position_de?: string;
  position_en?: string;
  position_es?: string;
  bio_de?: string;
  bio_en?: string;
  bio_es?: string;
  is_public?: boolean;
  is_active?: boolean;
}
