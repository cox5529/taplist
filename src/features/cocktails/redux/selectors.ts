import { createSelector } from '@reduxjs/toolkit';

import { Cocktail, CocktailIngredient } from '../models/cocktail';
import { CocktailFeatureState, CocktailState, IngredientState, LoadingState } from './reducer';

export const getCocktailById = createSelector(
  (state: CocktailFeatureState) => state,
  (_: CocktailFeatureState, id: string) => id,
  (state: CocktailFeatureState, id: string): CocktailState => {
    if (!state.cocktails[id]) {
      return {
        cocktailLoadState: 'idle',
        ingredientLoadState: 'idle',
        cocktail: null,
      };
    }

    const data = state.cocktails[id];
    if (!data.cocktail) {
      return { ...data };
    }

    const cocktail = { ...data.cocktail };
    const ingredients: CocktailIngredient[] = [];
    cocktail.ingredients.forEach((cocktailIngredient) => {
      const ingredient = { ...cocktailIngredient };

      const id = ingredient.ingredientId;
      if (state.ingredients[id]?.ingredient) {
        ingredient.ingredient = { ...state.ingredients[id].ingredient };
      }

      ingredients.push(ingredient);
    });

    cocktail.ingredients = ingredients;

    return {
      cocktailLoadState: data.cocktailLoadState,
      ingredientLoadState: data.ingredientLoadState,
      cocktail,
    };
  },
);

export const getCocktailsByIds = createSelector(
  (state: CocktailFeatureState) => state,
  (_: CocktailFeatureState, ids: string[]) => ids,
  (state: CocktailFeatureState, ids: string[]): Record<string, CocktailState> => {
    const data = ids.map((id) => ({ id, cocktail: getCocktailById(state, id) }));
    const response: Record<string, CocktailState> = {};

    for (const { id, cocktail } of data) {
      response[id] = cocktail;
    }

    return response;
  },
);

export const getIngredientById = createSelector(
  (state: CocktailFeatureState) => state,
  (_: CocktailFeatureState, id: string) => id,
  (state: CocktailFeatureState, id: string): IngredientState => {
    const defaultState = state.allIngredientsLoadState;

    if (!state.ingredients[id]) {
      return {
        loadState: defaultState,
        ingredient: null,
      };
    }

    const data = state.ingredients[id];
    if (!data.ingredient) {
      return {
        loadState: defaultState,
        ingredient: data.ingredient,
      };
    }

    return { ...data };
  },
);

export const getIngredientsByIds = createSelector(
  (state: CocktailFeatureState) => state,
  (_: CocktailFeatureState, ids: string[]) => ids,
  (state: CocktailFeatureState, ids: string[]): Record<string, IngredientState> => {
    const data = ids.map((id) => ({ id, cocktail: getIngredientById(state, id) }));
    const response: Record<string, IngredientState> = {};

    for (const { id, cocktail } of data) {
      response[id] = cocktail;
    }

    return response;
  },
);

export const getAllIngredients = createSelector(
  (state: CocktailFeatureState) => state,
  (
    state: CocktailFeatureState,
  ): {
    loadState: LoadingState;
    ingredients: IngredientState[];
  } => ({
    loadState: state.allIngredientsLoadState,
    ingredients: Object.values(state.ingredients),
  }),
);

export const getCuratedCocktails = createSelector(
  (state: CocktailFeatureState) => state,
  (
    state: CocktailFeatureState,
  ): {
    loadState: LoadingState;
    cocktails: Cocktail[];
  } => {
    const loadState = state.curatedCocktails.loadState;
    if (loadState !== 'loaded') {
      return {
        loadState,
        cocktails: [],
      };
    }

    return {
      loadState,
      cocktails: state.curatedCocktails.ids.map((id) => state.cocktails[id]?.cocktail).filter((x) => !!x),
    };
  },
);
