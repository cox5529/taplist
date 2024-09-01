import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  CollectionReference,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../../../firebase';
import { Cocktail } from '../models/cocktail';
import { CocktailFeatureState } from './reducer';

export const fetchCuratedCocktails = createAsyncThunk(
  'cocktails/fetchCuratedCocktails',
  async (): Promise<Cocktail[]> => {
    const cocktailCollection = collection(firestore, 'cocktails') as CollectionReference<Cocktail>;
    const curatedQuery = query(cocktailCollection, where('curated', '==', true));
    const response = await getDocs(curatedQuery);
    return response.docs.map((x) => (x.exists() ? x.data() : null)).filter((x) => !!x);
  },
);

export const addFetchCuratedCocktailsReducers = (builder: ActionReducerMapBuilder<CocktailFeatureState>) => {
  builder.addCase(fetchCuratedCocktails.pending, (state) => {
    state.curatedCocktails.loadState = 'pending';
  });

  builder.addCase(fetchCuratedCocktails.fulfilled, (state, action) => {
    const cocktails = action.payload;

    state.curatedCocktails.loadState = 'loaded';
    state.curatedCocktails.ids = cocktails.map((x) => x.id);

    cocktails.map((cocktail) => {
      state.cocktails[cocktail.id] = {
        cocktailLoadState: 'loaded',
        ingredientLoadState: 'idle',
        cocktail: cocktail,
      };
    });
  });
};
