import { Ingredient } from '../models/ingredient';
import { Cocktail } from '../models/cocktail';
import { createSlice } from '@reduxjs/toolkit';
import { addFetchCocktailReducers } from './fetchCocktail';
import { getAllIngredients, getCocktailById, getCocktailsByIds, getCuratedCocktails, getIngredientById, getIngredientsByIds } from './selectors';
import { addFetchIngredientsForCocktailReducers as addFetchIngredientsForCocktailReducers } from './fetchIngredientsForCocktail';
import { addFetchAllIngredientsReducers as addFetchAllIngredientsReducers } from './fetchAllIngredients';
import { addFetchCuratedCocktailsReducers } from './fetchCuratedCocktails';

export type LoadingState = 'idle' | 'pending' | 'loaded' | 'rejected';

export type IngredientState = {
  loadState: LoadingState;
  ingredient: Ingredient | null;
};

export type CocktailState = {
  cocktailLoadState: LoadingState;
  ingredientLoadState: LoadingState;
  cocktail: Cocktail | null;
};

export type CocktailFeatureState = {
  cocktails: {
    [id: string]: CocktailState;
  };
  ingredients: {
    [id: string]: IngredientState;
  };
  allIngredientsLoadState: LoadingState;
  curatedCocktails: {
    loadState: LoadingState;
    ids: string[];
  }
};

const initialState: CocktailFeatureState = {
  cocktails: {},
  ingredients: {},
  allIngredientsLoadState: 'idle',
  curatedCocktails: {
    loadState: 'idle',
    ids: []
  }
};

export const cocktailSlice = createSlice({
  name: 'cocktails',
  initialState: initialState,
  reducers: {},
  selectors: {
    getCocktailById,
    getCocktailsByIds,
    getIngredientById,
    getIngredientsByIds,
    getAllIngredients,
    getCuratedCocktails
  },
  extraReducers: (builder) => {
    addFetchCocktailReducers(builder);
    addFetchIngredientsForCocktailReducers(builder);
    addFetchAllIngredientsReducers(builder);
    addFetchCuratedCocktailsReducers(builder);
  },
});
