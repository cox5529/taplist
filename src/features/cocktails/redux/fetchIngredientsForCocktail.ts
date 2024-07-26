import { ActionReducerMapBuilder, createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';
import { collection, CollectionReference, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { CocktailFeatureState } from './reducer';
import { Ingredient } from '../models/ingredient';
import { Cocktail } from '../models/cocktail';
import { AppState } from '../../../redux/store';

export const fetchIngredientsForCocktail = createAsyncThunk(
  'cocktails/fetchIngredientsForCocktail',
  async (cocktail: Cocktail, api): Promise<null | Ingredient[]> => {
    const state = api.getState() as AppState;

    let ingredientIds = cocktail.ingredients.map((x) => x.ingredientId);
    const existingIngredientIds = ingredientIds.filter(id => {
      const loadState = state.cocktails.ingredients[id]?.loadState;
      return loadState === 'loaded';
    });
    ingredientIds = ingredientIds.filter(id => !existingIngredientIds.includes(id));

    const ingredientCollection = collection(firestore, 'ingredients') as CollectionReference<Ingredient>;
    const ingredientQuery = query(ingredientCollection, where('id', 'in', ingredientIds));
    const response = await getDocs(ingredientQuery);
    return response.docs.map((x) => (x.exists() ? x.data() : null)).filter((x) => !!x) as Ingredient[];
  },
);

export const addFetchIngredientsForCocktailReducers = (builder: ActionReducerMapBuilder<CocktailFeatureState>) => {
  builder.addCase(fetchIngredientsForCocktail.pending, (state, action) => {
    const cocktail = action.meta.arg;

    cocktail.ingredients.map((ingredient) => {
      const id = ingredient.ingredientId;
      const existingState = state.ingredients[id]?.loadState;
      if (existingState === 'loaded') {
        return;
      }

      state.ingredients[id] = {
        loadState: 'pending',
        ingredient: null,
      };
    });

    if (state.cocktails[cocktail.id]) {
      state.cocktails[cocktail.id].ingredientLoadState = 'pending';
    }
  });

  builder.addCase(fetchIngredientsForCocktail.fulfilled, (state, action) => {
    const ingredients = action.payload;
    const cocktail = action.meta.arg.id;
    
    ingredients?.map((ingredient) => {
      state.ingredients[ingredient.id] = {
        loadState: 'loaded',
        ingredient,
      };
    });

    state.cocktails[cocktail].ingredientLoadState = 'loaded';
  });
};
