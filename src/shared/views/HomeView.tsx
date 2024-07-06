import React from 'react';

import BeerList from '../../features/beer/views/BeerList';
import CocktailList from '../../features/cocktails/components/CocktailList';
import HomeSection from '../components/HomeSection';

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
        
      </HomeSection>
    </div>
  );
};

export default HomeView;
