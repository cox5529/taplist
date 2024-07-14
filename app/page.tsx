import React from 'react';
import CocktailList from '../src/features/cocktails/views/cocktails/CocktailListView';
import HomeSection from '../src/shared/components/HomeSection';
import BeerList from '../src/features/beer/views/BeerList';
import CocktailSearchView from '../src/features/cocktails/views/cocktails/CocktailSearchView';
import { useCocktails } from '../src/features/cocktails/hooks/useCocktails';
import { useBeers } from '../src/features/beer/hooks/useBeers';
import { useScales } from '../src/features/beer/hooks/useScales';
import { Page } from '../src/types';

const Index: Page = async () => {
  const cocktails = await useCocktails({
    curated: true,
  });

  const beers = await useBeers();
  const scales = await useScales();

  return (
    <>
      <HomeSection header='House Cocktails' addRoute='/cocktails/create'>
        <CocktailList cocktails={cocktails} />
      </HomeSection>
      <HomeSection header='Beer'>
        <BeerList beerResponse={beers} scales={scales} />
      </HomeSection>
      <HomeSection header='Looking for something else?' addRoute='/cocktails/ingredients' addButtonText='Ingredients'>
        <CocktailSearchView />
      </HomeSection>
    </>
  );
};

export default Index;
