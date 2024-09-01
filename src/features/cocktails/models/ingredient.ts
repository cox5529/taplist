export enum Allergen {
  EggWhite = 'egg white',
  EggYolk = 'egg yolk',
  Nuts = 'nuts',
  Dairy = 'dairy',
}

export interface Ingredient {
  id: string;
  name: string;
  abv?: number;
  allergens?: Allergen[];
}
