import React from 'react';
import CocktailList from '../src/features/cocktails/views/cocktails/CocktailListView';
import HomeSection from '../src/shared/components/HomeSection';
import BeerList from '../src/features/beer/views/BeerList';
import CocktailSearchView from '../src/features/cocktails/views/cocktails/CocktailSearchView';
import { GetStaticProps } from 'next';
import { useCocktails } from '../src/features/cocktails/hooks/useCocktails';
import { Cocktail } from '../src/features/cocktails/models/cocktail';
import { useBeers } from '../src/features/beer/hooks/useBeers';
import { useScales } from '../src/features/beer/hooks/useScales';
import { Beer } from '../src/features/beer/models/beer';
import { Scale } from '../src/features/beer/models/scale';
import { NextPageWithLayout } from './_app';

type Props = {
  cocktails: Cocktail[];
  beers: Beer[];
  scales: Scale[];
};

const Index: NextPageWithLayout<Props> = (props) => {
  return (
    <>
      <HomeSection header='House Cocktails' addRoute='/cocktails/create'>
        <CocktailList cocktails={props.cocktails} />
      </HomeSection>
      <HomeSection header='Beer'>
        <BeerList beerResponse={props.beers} scales={props.scales} />
      </HomeSection>
      <HomeSection header='Looking for something else?' addRoute='/cocktails/ingredients' addButtonText='Ingredients'>
        <CocktailSearchView />
      </HomeSection>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const cocktails = await useCocktails({
    curated: true,
  });

  const beers = await useBeers();
  const scales = await useScales();

  return {
    props: {
      cocktails,
      beers,
      scales,
    },
  };
};

export default Index;
