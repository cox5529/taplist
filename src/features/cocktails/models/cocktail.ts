import { Ingredient } from './ingredient';

export enum Unit {
  Dash = 'Dash',
  Teaspoon = 'Teaspoon',
  Tablespoon = 'Tablespoon',
  Ounce = 'Ounce',
  Unit = 'Unit',
  Handful = 'Handful',
  Leaf = 'Leaf'
}

export type CocktailIngredient = {
  ingredientId: string;
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
  relatedRecipes: string[];
};

export const PluralMap: Record<Unit, string> = {
  [Unit.Tablespoon]: 'Tbsp',
  [Unit.Dash]: 'dashes',
  [Unit.Ounce]: 'oz',
  [Unit.Teaspoon]: 'tsp',
  [Unit.Unit]: '',
  [Unit.Handful]: 'handfuls',
  [Unit.Leaf]: 'leaves',
};

export const SingularMap: Record<Unit, string> = {
  [Unit.Tablespoon]: 'Tbsp',
  [Unit.Dash]: 'dash',
  [Unit.Ounce]: 'oz',
  [Unit.Teaspoon]: 'tsp',
  [Unit.Unit]: '',
  [Unit.Handful]: 'Handful',
  [Unit.Leaf]: 'leaf',
};
