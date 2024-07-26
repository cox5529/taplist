import React from 'react';

import Spinner from '../../../../shared/components/shapes/Spinner';
import { useCocktails } from '../../hooks/useCocktails';
import MenuItem from '../../components/menu/MenuItem';
import { useCuratedCocktails } from '../../hooks/useCuratedCocktails';

const CocktailList: React.FC = () => {
  const [data, areCocktailsLoading] = useCuratedCocktails();

  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 text-xl gap-8'>
      {areCocktailsLoading ? <Spinner className='w-20 h-20' /> : data.map((x, i) => <MenuItem cocktail={x} key={i} />)}
    </div>
  );
};

export default CocktailList;
