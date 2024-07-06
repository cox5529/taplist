import React from 'react';
import CocktailSearchForm from '../components/search/CocktailSearchForm';

const CocktailSearchView: React.FC = () => {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
      <CocktailSearchForm />
    </div>
  );
};

export default CocktailSearchView;
