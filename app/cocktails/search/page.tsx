import React from 'react';
import { Page } from '../../../src/types';
import SectionHeaderWithButton from '../../../src/shared/components/typography/SectionHeaderWithButton';
import CocktailSearchForm from '../../../src/features/cocktails/components/search/CocktailSearchForm';
import CocktailSearchResultsList from '../../../src/features/cocktails/components/search/CocktailSearchResultsList';

const CocktailSearchResultsView: Page<{}, { query: string }> = (props) => {
  const query = props.searchParams.query;

  return (
    <div className='flex gap-4 flex-col'>
      <SectionHeaderWithButton header={`Search results for '${query}'`} backButton />
      <CocktailSearchForm initialSearch={query ?? ''} />
      <CocktailSearchResultsList query={query} />
    </div>
  );
};

export default CocktailSearchResultsView;
