export interface HousingLocation {
  id: number;
  name: string;
  city: string;
  district: string;
  state: string;
  photo: string;
  gallery: string[];
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'Villa' | 'Daire' | 'Rezidans' | 'Yalı';
  tag: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
  description: string;
}
