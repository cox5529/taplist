import React, { useMemo } from 'react';

import { doc, DocumentReference } from '@firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

import { firestore } from '../../../firebase';
import Button from '../../../shared/components/buttons/Button';
import Paragraph from '../../../shared/components/typography/Paragraph';
import SectionHeader from '../../../shared/components/typography/SectionHeader';
import SubsectionHeader from '../../../shared/components/typography/SubsectionHeader';
import { useIngredients } from '../hooks/useIngredients';
import { Cocktail, CocktailIngredient, PluralMap, SingularMap, Unit } from '../models/cocktail';

const CocktailDetailsView: React.FC = () => {
  const { id } = useParams();

  const [cocktail] = useDocumentDataOnce<Cocktail>(
    doc(firestore, 'cocktails', id ?? '') as DocumentReference<Cocktail>,
  );

  const ingredientIds = cocktail?.ingredients.map((x) => x.ingredientId);
  const [ingredients] = useIngredients(ingredientIds);

  const cocktailIngredients = useMemo(
    () => cocktail?.ingredients.map((x) => ({ ...x, ingredient: ingredients.find((y) => y.id === x.ingredientId) })),
    [cocktail?.ingredients, ingredients],
  );

  const getIngredientString = (ingredient: CocktailIngredient): string => {
    const unit = ingredient.quantity === 1 ? SingularMap[ingredient.unit] : PluralMap[ingredient.unit];

    if (ingredient.unit === Unit.Unit) {
      if (ingredient.quantity === 1) {
        return ingredient.ingredient?.name ?? '';
      }

      return `${ingredient.quantity} ${ingredient.ingredient?.name}`;
    }

    return `${ingredient.quantity} ${unit} ${ingredient.ingredient?.name}`;
  };

  return (
    <article className='py-8 max-w-[500px] mx-auto flex gap-12 flex-col'>
      <section>
        <div className='flex justify-between items-center pb-2'>
          <SectionHeader>{cocktail?.name}</SectionHeader>
          <Button to='/'>Back</Button>
        </div>
        <Paragraph>{cocktail?.description}</Paragraph>
      </section>
      <section>
        <SubsectionHeader>Ingredients</SubsectionHeader>
        <ul>
          {cocktailIngredients?.map((x, i) => (
            <li key={i}>{getIngredientString(x)}</li>
          ))}
        </ul>
      </section>
      <section>
        <SubsectionHeader>Steps</SubsectionHeader>
        <ol className='list-decimal'>
          {cocktail?.instructions.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ol>
      </section>
    </article>
  );
};

export default CocktailDetailsView;
