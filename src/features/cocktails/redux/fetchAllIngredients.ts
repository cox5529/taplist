import { ActionReducerMapBuilder, createAsyncThunk, GetThunkAPI } from '@reduxjs/toolkit';
import { collection, CollectionReference, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { CocktailFeatureState } from './reducer';
import { Ingredient } from '../models/ingredient';

export const fetchAllIngredients = createAsyncThunk(
  'cocktails/fetchAllIngredients',
  async (): Promise<null | Ingredient[]> => {
    const ingredientCollection = collection(firestore, 'ingredients') as CollectionReference<Ingredient>;
    const response = await getDocs(ingredientCollection);
    return response.docs.map((x) => (x.exists() ? x.data() : null)).filter((x) => !!x) as Ingredient[];
  },
);

export const addFetchAllIngredientsReducers = (builder: ActionReducerMapBuilder<CocktailFeatureState>) => {
  builder.addCase(fetchAllIngredients.pending, (state, action) => {
    state.allIngredientsLoadState = 'pending';
  });

  builder.addCase(fetchAllIngredients.fulfilled, (state, action) => {
    const ingredients = action.payload;
    
    ingredients?.map((ingredient) => {
      state.ingredients[ingredient.id] = {
        loadState: 'loaded',
        ingredient,
      };
    });
  });
};
