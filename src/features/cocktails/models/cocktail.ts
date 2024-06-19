export enum Unit {}

export type CocktailIngredient = {
  ingredientId: string;
  instruction: string;
  quantity: number;
  unit: Unit;
};

export type Cocktail = {
  description: string;
  id: string;
  ingredients: CocktailIngredient[];
  instructions: string[];
  name: string;
  curated?: boolean;
};
