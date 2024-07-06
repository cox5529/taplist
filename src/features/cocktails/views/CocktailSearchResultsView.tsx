import React, { useEffect, useMemo } from 'react';
import SectionHeader from '../../../shared/components/typography/SectionHeader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../shared/components/buttons/Button';
import CocktailSearchForm from '../components/search/CocktailSearchForm';
import { InfiniteHits, useInfiniteHits, useSearchBox } from 'react-instantsearch';
import MenuItem from '../components/menu/MenuItem';
import type { Hit, BaseHit } from 'instantsearch.js';
import { Cocktail } from '../models/cocktail';

type HitType = {
  name: string;
  description: string;
};

type HitComponentProps = {
  hit: Hit<HitType>;
};

const HitComponent: React.FC<HitComponentProps> = ({ hit }: HitComponentProps) => {
  const cocktail: Cocktail = {
    name: hit.name,
    description: hit.description,
    id: hit.objectID,
    ingredients: [],
    instructions: [],
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
      <div className='flex justify-between gap-2'>
        <SectionHeader>Search results for '{query}'</SectionHeader>
        <Button to='/' className='w-16 flex items-center justify-center'>
          Back
        </Button>
      </div>
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
