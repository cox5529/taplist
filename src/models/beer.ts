export type Beer = {
  abv: number;
  srm: number;
  originalGravity: number;
  finalGravity: number;
  name: string;
  description: string;
  brewDate: Date;
  packageDate: Date;
};

export type BottledBeer = Beer & { type: 'bottled'; capColor: string };

export type KeggedBeer = Beer & { type: 'kegged'; keg: number };
