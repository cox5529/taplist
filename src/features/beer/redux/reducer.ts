import { Beer } from '../models/beer';
import { Scale } from '../models/scale';
import { createSlice } from '@reduxjs/toolkit';

export type BeerState = {
  [id: string]: Beer;
};

export type ScaleState = {
  [id: string]: Scale;
};

const initialBeerState: BeerState = {};
const initialScaleState: ScaleState = {};

export const beerSlice = createSlice({
  name: 'beers',
  initialState: initialBeerState,
  reducers: {},
  selectors: {}
});


export const scaleSlice = createSlice({
  name: 'scales',
  initialState: initialScaleState,
  reducers: {},
  selectors: {}
});
