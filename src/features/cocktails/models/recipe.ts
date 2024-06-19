export enum Unit {}

export type RecipeIngredient = {
  ingredientId: string;
  instruction: string;
  quantity: number;
  unit: Unit;
};

export type Recipe = {
  description: string;
  id: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  name: string;
};
