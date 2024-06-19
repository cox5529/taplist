import { Ingredient } from './ingredient';

export enum Unit {
  Tablespoon = 'Tablespoon',
  Dash = 'Dash',
  Unit = 'Unit',
  Ounce = 'Ounce',
  Teaspoon = 'Teaspoon',
}

export type CocktailIngredient = {
  ingredientId: string;
  instruction: string;
  quantity: number;
  unit: Unit;
  ingredient?: Ingredient;
};

export type Cocktail = {
  description: string;
  id: string;
  ingredients: CocktailIngredient[];
  instructions: string[];
  name: string;
  curated?: boolean;
};

export const PluralMap: Record<Unit, string> = {
  [Unit.Tablespoon]: 'tablespoons',
  [Unit.Dash]: 'dashes',
  [Unit.Ounce]: 'ounces',
  [Unit.Teaspoon]: 'teaspoons',
  [Unit.Unit]: '',
};


export const SingularMap: Record<Unit, string> = {
  [Unit.Tablespoon]: 'tablespoon',
  [Unit.Dash]: 'dash',
  [Unit.Ounce]: 'ounce',
  [Unit.Teaspoon]: 'teaspoon',
  [Unit.Unit]: '',
};
