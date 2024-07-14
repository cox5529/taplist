import React from 'react';

import MenuItem from '../../components/menu/MenuItem';
import { Cocktail } from '../../models/cocktail';

type Props = {
  cocktails: Cocktail[];
};

const CocktailList: React.FC<Props> = ({ cocktails }) => {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 text-xl gap-8'>
      {cocktails.map((x, i) => (
        <MenuItem cocktail={x} key={i} />
      ))}
    </div>
  );
};

export default CocktailList;
