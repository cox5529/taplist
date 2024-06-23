import React, { useMemo } from 'react';

import { doc, DocumentReference } from '@firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

import { auth, firestore } from '../../../firebase';
import LoadingBox from '../../../shared/components/LoadingBox';
import Button from '../../../shared/components/buttons/Button';
import Paragraph from '../../../shared/components/typography/Paragraph';
import SectionHeader from '../../../shared/components/typography/SectionHeader';
import SubsectionHeader from '../../../shared/components/typography/SubsectionHeader';
import { useIngredients } from '../hooks/useIngredients';
import { Cocktail, CocktailIngredient, PluralMap, SingularMap, Unit } from '../models/cocktail';

const CocktailDetailsView: React.FC = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  const [cocktail] = useDocumentData<Cocktail>(doc(firestore, 'cocktails', id ?? '') as DocumentReference<Cocktail>);

  const ingredientIds = cocktail?.ingredients.map((x) => x.ingredientId);
  const [ingredients] = useIngredients(ingredientIds ?? []);

  const cocktailIngredients = useMemo(
    () => cocktail?.ingredients.map((x) => ({ ...x, ingredient: ingredients.find((y) => y.id === x.ingredientId) })),
    [cocktail?.ingredients, ingredients],
  );

  const gcd = (a: number, b: number): number => {
    if (!b) return a;

    return gcd(b, a % b);
  };

  const getQuantityString = (quantity: number): string => {
    let str = `${quantity}`;
    if (!str.includes('.')) {
      return str;
    }

    let [whole, fraction] = str.split('.');
    const order = fraction.length;
    const denominator = Math.pow(10, order);
    const numerator = parseFloat(fraction);
    const divisor = gcd(denominator, numerator);

    str = `${numerator / divisor}/${denominator / divisor}`;
    if (whole === '0') {
      return str;
    }

    return `${whole} ${str}`;
  };

  const getIngredientString = (ingredient: CocktailIngredient): string => {
    const unit = ingredient.quantity === 1 ? SingularMap[ingredient.unit] : PluralMap[ingredient.unit];
    const quantity = getQuantityString(ingredient.quantity);

    if (ingredient.unit === Unit.Unit) {
      if (ingredient.quantity === 1) {
        return ingredient.ingredient?.name ?? '';
      }

      return `${quantity} ${ingredient.ingredient?.name}`;
    }

    return `${quantity} ${unit} ${ingredient.ingredient?.name}`;
  };

  return cocktail && cocktailIngredients ? (
    <div className='flex gap-12 flex-col'>
      <section>
        <div className='flex justify-between items-center pb-2 gap-2'>
          <SectionHeader>{cocktail?.name}</SectionHeader>
          <span className='flex-grow'></span>
          {user && <Button to='edit'>Edit</Button>}
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
    </div>
  ) : (
    <LoadingBox />
  );
};

export default CocktailDetailsView;
