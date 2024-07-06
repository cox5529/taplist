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
};

export const PluralMap: Record<Unit, string> = {
  [Unit.Tablespoon]: 'tablespoons',
  [Unit.Dash]: 'dashes',
  [Unit.Ounce]: 'ounces',
  [Unit.Teaspoon]: 'teaspoons',
  [Unit.Unit]: '',
  [Unit.Handful]: 'handfuls',
  [Unit.Leaf]: 'leaves',
};

export const SingularMap: Record<Unit, string> = {
  [Unit.Tablespoon]: 'tablespoon',
  [Unit.Dash]: 'dash',
  [Unit.Ounce]: 'ounce',
  [Unit.Teaspoon]: 'teaspoon',
  [Unit.Unit]: '',
  [Unit.Handful]: 'Handful',
  [Unit.Leaf]: 'leaf',
};
