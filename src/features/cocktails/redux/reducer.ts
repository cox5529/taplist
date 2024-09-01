import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Cocktail } from '../models/cocktail';
import { Ingredient } from '../models/ingredient';
import { addFetchAllIngredientsReducers } from './fetchAllIngredients';
import { addFetchCocktailReducers } from './fetchCocktail';
import { addFetchCuratedCocktailsReducers } from './fetchCuratedCocktails';
import { addFetchIngredientsForCocktailReducers } from './fetchIngredientsForCocktail';
import {
  getAllIngredients,
  getCocktailById,
  getCocktailsByIds,
  getCuratedCocktails,
  getIngredientById,
  getIngredientsByIds,
} from './selectors';

export type LoadingState = 'idle' | 'pending' | 'loaded' | 'rejected';

export interface IngredientState {
  loadState: LoadingState;
  ingredient: Ingredient | null;
}

export interface CocktailState {
  cocktailLoadState: LoadingState;
  ingredientLoadState: LoadingState;
  cocktail: Cocktail | null;
}

export interface CocktailFeatureState {
  cocktails: Record<string, CocktailState>;
  ingredients: Record<string, IngredientState>;
  allIngredientsLoadState: LoadingState;
  curatedCocktails: {
    loadState: LoadingState;
    ids: string[];
  };
}

const initialState: CocktailFeatureState = {
  cocktails: {},
  ingredients: {},
  allIngredientsLoadState: 'idle',
  curatedCocktails: {
    loadState: 'idle',
    ids: [],
  },
};

export const cocktailSlice = createSlice({
  name: 'cocktails',
  initialState: initialState,
  reducers: {
    updateCocktail: (state, action: PayloadAction<Cocktail>) => {
      const cocktail = action.payload;
      state.cocktails[cocktail.id].cocktail = cocktail;
    },
    deleteCocktail: (state, action: PayloadAction<string>) => {
      state.cocktails[action.payload] = {
        cocktail: null,
        cocktailLoadState: 'rejected',
        ingredientLoadState: 'loaded'
      };
    },
  },
  selectors: {
    getCocktailById,
    getCocktailsByIds,
    getIngredientById,
    getIngredientsByIds,
    getAllIngredients,
    getCuratedCocktails,
  },
  extraReducers: (builder) => {
    addFetchCocktailReducers(builder);
    addFetchIngredientsForCocktailReducers(builder);
    addFetchAllIngredientsReducers(builder);
    addFetchCuratedCocktailsReducers(builder);
  },
});
