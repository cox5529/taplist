import React from 'react';
import CocktailList from '../src/features/cocktails/views/cocktails/CocktailListView';
import HomeSection from '../src/shared/components/HomeSection';
import BeerList from '../src/features/beer/views/BeerList';
import CocktailSearchView from '../src/features/cocktails/views/cocktails/CocktailSearchView';

const Index: React.FC = () => {
  return (
    <div className='bg-white text-black w-screen h-screen overflow-auto print:h-auto px-8'>
      <HomeSection header='House Cocktails' addRoute='/cocktails/create'>
        <CocktailList />
      </HomeSection>
      <HomeSection header='Beer'>
        <BeerList />
      </HomeSection>
      <HomeSection header='Looking for something else?' addRoute='/cocktails/ingredients' addButtonText='Ingredients'>
        <CocktailSearchView />
      </HomeSection>
    </div>
  );
};

export default Index;
