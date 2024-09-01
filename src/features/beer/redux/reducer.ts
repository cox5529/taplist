import { createSlice } from '@reduxjs/toolkit';

import { Beer } from '../models/beer';
import { Scale } from '../models/scale';

export type BeerState = Record<string, Beer>;

export type ScaleState = Record<string, Scale>;

const initialBeerState: BeerState = {};
const initialScaleState: ScaleState = {};

export const beerSlice = createSlice({
  name: 'beers',
  initialState: initialBeerState,
  reducers: {},
  selectors: {},
});

export const scaleSlice = createSlice({
  name: 'scales',
  initialState: initialScaleState,
  reducers: {},
  selectors: {},
});
