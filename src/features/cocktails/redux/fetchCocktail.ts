import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, DocumentReference, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { Cocktail } from '../models/cocktail';
import { CocktailFeatureState } from './reducer';
import { AppState } from '../../../redux/store';

export const fetchCocktail = createAsyncThunk(
  'cocktails/fetchCocktail',
  async (id: string, api): Promise<null | Cocktail> => {
    const state = api.getState() as AppState;

    const existingCocktailState = state.cocktails.cocktails[id]?.cocktailLoadState;
    if (existingCocktailState === 'loaded') {
      return state.cocktails.cocktails[id].cocktail;
    }

    const cocktailDocument = doc(firestore, 'cocktails', id) as DocumentReference<Cocktail>;
    const response = await getDoc(cocktailDocument);
    return response.exists() ? response.data() : null;
  },
);

export const addFetchCocktailReducers = (builder: ActionReducerMapBuilder<CocktailFeatureState>) => {
  builder.addCase(fetchCocktail.pending, (state, action) => {
    if (state.cocktails[action.meta.arg]?.cocktailLoadState === 'loaded') {
      return;
    }

    state.cocktails[action.meta.arg] = {
      cocktailLoadState: 'pending',
      ingredientLoadState: 'idle',
      cocktail: null,
    };
  });

  builder.addCase(fetchCocktail.fulfilled, (state, action) => {
    const cocktail = action.payload;
    if (!cocktail) {
      state.cocktails[action.meta.arg] = {
        cocktailLoadState: 'rejected',
        ingredientLoadState: 'idle',
        cocktail: null,
      };
    } else {
      state.cocktails[cocktail.id] = {
        cocktailLoadState: 'loaded',
        ingredientLoadState: 'idle',
        cocktail: cocktail,
      };
    }
  });
};
