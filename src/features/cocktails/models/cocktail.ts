import { Ingredient } from './ingredient';

export enum Unit {
  Dash = 'Dash',
  Teaspoon = 'Teaspoon',
  Tablespoon = 'Tablespoon',
  Ounce = 'Ounce',
  Unit = 'Unit',
  Handful = 'Handful',
  Leaf = 'Leaf',
  Barspoon = 'Barspoon',
}

export interface CocktailIngredient {
  ingredientId: string;
  quantity: number;
  unit: Unit;
  ingredient?: Ingredient;
}

export interface Cocktail {
  description: string;
  id: string;
  ingredients: CocktailIngredient[];
  instructions: string[];
  name: string;
  curated?: boolean;
  relatedRecipes: string[];
}

export const PluralMap: Record<Unit, string> = {
  [Unit.Tablespoon]: 'Tbsp',
  [Unit.Dash]: 'dashes',
  [Unit.Ounce]: 'oz',
  [Unit.Teaspoon]: 'tsp',
  [Unit.Unit]: '',
  [Unit.Handful]: 'handfuls',
  [Unit.Leaf]: 'leaves',
  [Unit.Barspoon]: 'barspoons',
};

export const SingularMap: Record<Unit, string> = {
  [Unit.Tablespoon]: 'Tbsp',
  [Unit.Dash]: 'dash',
  [Unit.Ounce]: 'oz',
  [Unit.Teaspoon]: 'tsp',
  [Unit.Unit]: '',
  [Unit.Handful]: 'Handful',
  [Unit.Leaf]: 'leaf',
  [Unit.Barspoon]: 'barspoon',
};
