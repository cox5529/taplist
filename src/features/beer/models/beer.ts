export interface Beer {
  id?: string;
  abv: number;
  srm: number;
  ibu: number;
  originalGravity: number;
  finalGravity: number;
  name: string;
  style: string;
  description: string;
  brewDate: string | Date;
  packageDate: string | Date;
  capColor?: string;
  keg?: number | null;
  calories?: number;
  scale?: string;
  empty?: string;
  aging?: string;
  type: 'fermenting' | 'packaged';
}
