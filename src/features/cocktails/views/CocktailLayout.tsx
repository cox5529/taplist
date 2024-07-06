import React from 'react';
import { InstantSearch } from 'react-instantsearch';
import { Outlet } from 'react-router-dom';
import { searchClient } from '../util/algolia';

const CocktailLayout = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName='ix-cocktail-search'>
      <div className='py-8 max-w-[500px] mx-auto flex flex-col'>
        <Outlet />
      </div>
    </InstantSearch>
  );
};

export default CocktailLayout;
