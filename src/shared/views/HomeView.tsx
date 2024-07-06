import React from 'react';

import BeerList from '../../features/beer/views/BeerList';
import CocktailList from '../../features/cocktails/views/cocktails/CocktailListView';
import HomeSection from '../components/HomeSection';
import CocktailSearchView from '../../features/cocktails/views/cocktails/CocktailSearchView';

const HomeView: React.FC = () => {
  return (
    <div>
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

export default HomeView;
