'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useInfiniteHits, useSearchBox } from 'react-instantsearch';
import type { Hit, BaseHit } from 'instantsearch.js';
import { Cocktail } from '../../models/cocktail';
import MenuItem from '../menu/MenuItem';
import Button from '../../../../shared/components/buttons/Button';

type Props = {
  query: string;
};

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
    relatedRecipes: [],
  };

  return <MenuItem cocktail={cocktail} />;
};

const CocktailSearchResultsList = ({ query }: Props) => {
  const router = useRouter();

  const { refine } = useSearchBox();
  const { results, isFirstPage, isLastPage, showPrevious, showMore } = useInfiniteHits<HitType>();

  useEffect(() => {
    if (!query || typeof query !== 'string' || query.length === 0) {
      router.push('/');
    }

    refine(query ?? '');
  }, [query, router]);

  return (
    <>
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
    </>
  );
};

export default CocktailSearchResultsList;
