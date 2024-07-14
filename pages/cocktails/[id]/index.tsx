import React from 'react';

import { useCocktail } from '../../../src/features/cocktails/hooks/useCocktail';
import { useCocktails } from '../../../src/features/cocktails/hooks/useCocktails';
import SectionHeaderWithButton from '../../../src/shared/components/typography/SectionHeaderWithButton';
import Button from '../../../src/shared/components/buttons/Button';
import Paragraph from '../../../src/shared/components/typography/Paragraph';
import SubsectionHeader from '../../../src/shared/components/typography/SubsectionHeader';
import { getIngredientString } from '../../../src/features/cocktails/util/getIngredientString';
import MenuItem from '../../../src/features/cocktails/components/menu/MenuItem';
import { useAuthState } from '../../../src/shared/hooks/useAuthState';
import { GetStaticProps } from 'next';
import { Cocktail } from '../../../src/features/cocktails/models/cocktail';
import { NextPageWithLayout } from '../../_app';
import CocktailLayout from '../layout';

type Props = {
  cocktail: Cocktail;
  relatedCocktails: Cocktail[];
};

const CocktailDetailsView: NextPageWithLayout<Props> = ({ cocktail, relatedCocktails }: Props) => {
  const [user] = useAuthState();

  return (
    <div className='flex gap-12 flex-col'>
      <section>
        <SectionHeaderWithButton header={cocktail?.name} backButton>
          {user && <Button to='edit'>Edit</Button>}
        </SectionHeaderWithButton>
        <Paragraph>{cocktail?.description}</Paragraph>
      </section>
      <section>
        <SubsectionHeader>Ingredients</SubsectionHeader>
        <ul>{cocktail.ingredients?.map((x, i) => <li key={i}>{getIngredientString(x)}</li>)}</ul>
      </section>
      <section>
        <SubsectionHeader>Steps</SubsectionHeader>
        <ol className='list-decimal ml-4'>{cocktail?.instructions.map((x, i) => <li key={i}>{x}</li>)}</ol>
      </section>
      <section>
        <SubsectionHeader>Related Recipes</SubsectionHeader>
        <div className='flex flex-col gap-2'>
          {relatedCocktails.map((x, i) => (
            <MenuItem key={i} cocktail={x} />
          ))}
        </div>
      </section>
    </div>
  );
};

CocktailDetailsView.getLayout = (page) => {
  return <CocktailLayout>{page}</CocktailLayout>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = (params?.id ?? '') as string;
  const cocktail = await useCocktail(id);
  const relatedCocktails = await useCocktails({
    ids: cocktail?.relatedRecipes ?? [],
  });

  return {
    props: {
      cocktail,
      relatedCocktails,
    },
  };
};

export async function getStaticPaths() {
  const cocktails = await useCocktails({});
  const paths = cocktails.map((cocktail) => ({
    params: { id: cocktail.id },
  }));

  return { paths, fallback: false };
}

export default CocktailDetailsView;
