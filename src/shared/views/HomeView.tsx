import React from 'react';

import BeerList from '../../features/beer/views/BeerList';
import CocktailList from '../../features/cocktails/views/CocktailList';
import HomeSection from '../components/HomeSection';
import CocktailSearchView from '../../features/cocktails/views/CocktailSearchView';

const HomeView: React.FC = () => {
  return (
    <div>
      <HomeSection header='House Cocktails' addRoute='/cocktails/create'>
        <CocktailList />
      </HomeSection>
      <HomeSection header='Beer'>
        <BeerList />
      </HomeSection>
      <HomeSection header='Looking for something else?'>
        <CocktailSearchView />
      </HomeSection>
    </div>
  );
};

export default HomeView;
