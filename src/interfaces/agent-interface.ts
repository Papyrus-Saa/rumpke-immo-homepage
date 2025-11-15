export interface Agent {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  mobile?: string;
  photo_url?: string;
  languages: string[];
  is_active: boolean;
  is_public?: boolean;


  position_de?: string;
  position_en?: string;
  position_es?: string;
  position_pt?: string;
  position_fr?: string;
  position_it?: string;
  position_nl?: string;
  position_pl?: string;
  position_ru?: string;
  position_ar?: string;
  position_zh?: string;
  position_ja?: string;
  position_tr?: string;
  position_hi?: string;


  bio_de?: string;
  bio_en?: string;
  bio_es?: string;
  bio_pt?: string;
  bio_fr?: string;
  bio_it?: string;
  bio_nl?: string;
  bio_pl?: string;
  bio_ru?: string;
  bio_ar?: string;
  bio_zh?: string;
  bio_ja?: string;
  bio_tr?: string;
  bio_hi?: string;
}
