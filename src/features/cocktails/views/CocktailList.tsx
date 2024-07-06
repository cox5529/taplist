import React from 'react';

import Spinner from '../../../shared/components/shapes/Spinner';
import { useCocktails } from '../hooks/useCocktails';
import MenuItem from '../components/menu/MenuItem';

const CocktailList: React.FC = () => {
  const [data, areCocktailsLoaded] = useCocktails({
    curated: true
  });

  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 text-xl gap-8'>
      {areCocktailsLoaded ? data.map((x, i) => <MenuItem cocktail={x} key={i} />) : <Spinner className='w-20 h-20' />}
    </div>
  );
};

export default CocktailList;
