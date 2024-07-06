import { CocktailIngredient, PluralMap, SingularMap, Unit } from "../models/cocktail";

const gcd = (a: number, b: number): number => {
  if (!b) return a;

  return gcd(b, a % b);
};

 const getQuantityString = (quantity: number): string => {
  let str = `${quantity}`;
  if (!str.includes('.')) {
    return str;
  }

  let [whole, fraction] = str.split('.');
  const order = fraction.length;
  const denominator = Math.pow(10, order);
  const numerator = parseFloat(fraction);
  const divisor = gcd(denominator, numerator);

  str = `${numerator / divisor}/${denominator / divisor}`;
  if (whole === '0') {
    return str;
  }

  return `${whole} ${str}`;
};


export const getIngredientString = (ingredient: CocktailIngredient): string => {
  const unit = ingredient.quantity === 1 ? SingularMap[ingredient.unit] : PluralMap[ingredient.unit];
  const quantity = getQuantityString(ingredient.quantity);

  if (ingredient.unit === Unit.Unit) {
    if (ingredient.quantity === 1) {
      return ingredient.ingredient?.name ?? '';
    }

    return `${quantity} ${ingredient.ingredient?.name}`;
  }

  return `${quantity} ${unit} ${ingredient.ingredient?.name}`;
};
