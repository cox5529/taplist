import React, { useEffect, useMemo } from 'react';

import { useInfiniteHits, useSearchBox } from 'react-instantsearch';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../../../../shared/components/buttons/Button';
import SectionHeaderWithButton from '../../../../shared/components/typography/SectionHeaderWithButton';
import MenuItem from '../../components/menu/MenuItem';
import CocktailSearchForm from '../../components/search/CocktailSearchForm';
import { Cocktail } from '../../models/cocktail';

import type { Hit } from 'instantsearch.js';

interface HitType {
  name: string;
  description: string;
}

interface HitComponentProps {
  hit: Hit<HitType>;
}

const HitComponent: React.FC<HitComponentProps> = ({ hit }: HitComponentProps) => {
  const cocktail: Cocktail = {
    name: hit.name,
    description: hit.description,
    id: hit.objectID,
    ingredients: [],
    instructions: [],
    relatedRecipes: [],
  };

  return <MenuItem cocktail={cocktail} />;
};

const CocktailSearchResultsView: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const query = useMemo(() => params.get('query'), [params]);

  const { refine } = useSearchBox();
  const { results, isFirstPage, isLastPage, showPrevious, showMore } = useInfiniteHits<HitType>();

  useEffect(() => {
    if (!query || typeof query !== 'string' || query.length === 0) {
      navigate('/');
    }

    refine(query ?? '');
  }, [query, navigate]);

  return (
    <div className='flex gap-4 flex-col'>
      <SectionHeaderWithButton header={`Search results for '${query}'`} backButton />
      <CocktailSearchForm initialSearch={query ?? ''} />
      {results?.hits && (
        <div className='flex flex-col gap-4'>
          {results.hits.map((x, i) => (
            <HitComponent hit={x} key={i} />
          ))}
        </div>
      )}
      <div className='flex'>
        {!isFirstPage && <Button click={showPrevious}>Previous page</Button>}
        <span className='flex-grow'></span>
        {!isLastPage && <Button click={showMore}>Next page</Button>}
      </div>
    </div>
  );
};

export default CocktailSearchResultsView;
