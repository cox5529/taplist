import { configureStore } from '@reduxjs/toolkit';

import { beerSlice, BeerState, scaleSlice, ScaleState } from '../features/beer/redux/reducer';
import { cocktailSlice, CocktailFeatureState } from '../features/cocktails/redux/reducer';

export type AppState = {
  cocktails: CocktailFeatureState;
  beers: BeerState;
  scales: ScaleState;
};

export const store = configureStore<AppState>({
  reducer: {
    cocktails: cocktailSlice.reducer,
    beers: beerSlice.reducer,
    scales: scaleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
