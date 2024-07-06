import React, { useState } from 'react';
import BaseModal, { BaseModalProps } from '../../../../shared/components/modals/BaseModal';
import SubsectionHeader from '../../../../shared/components/typography/SubsectionHeader';
import Paragraph from '../../../../shared/components/typography/Paragraph';
import { Ingredient } from '../../models/ingredient';
import Button from '../../../../shared/components/buttons/Button';
import { Cocktail } from '../../models/cocktail';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../../../firebase';

type Props = BaseModalProps & {
  ingredients: Ingredient[];
  cocktails: Cocktail[];
  close: () => void;
};

const MergeIngredientModal: React.FC<Props> = (props: Props) => {
  const [isLoading, setLoading] = useState(false);

  const merge = async () => {
    setLoading(true);

    const ids = props.ingredients.map((x) => x.id);
    const newId = ids[0];

    for (const cocktail of props.cocktails) {
      const ingredientsToUpdate = cocktail.ingredients.filter(
        (x) => x.ingredientId !== newId && ids.includes(x.ingredientId),
      );
      if (ingredientsToUpdate.length === 0) {
        continue;
      }

      for (const cocktailIngredient of ingredientsToUpdate) {
        cocktailIngredient.ingredientId = newId;
      }

      await setDoc(doc(firestore, 'cocktails', cocktail.id), cocktail);
    }

    const ingredientsToDelete = ids.filter((x) => x !== newId);
    for (const id of ingredientsToDelete) {
      await deleteDoc(doc(firestore, 'ingredients', id));
    }

    setLoading(false);
    props.close();
  };

  return (
    <BaseModal open={props.open}>
      <SubsectionHeader>Merge ingredients</SubsectionHeader>
      <Paragraph>Are you sure you want to merge the following ingredients?</Paragraph>
      <ul className='list-disc ml-4 mt-4'>
        {props.ingredients.map((x, i) => (
          <li key={i}>{x.name}</li>
        ))}
      </ul>
      <div className='mt-8 flex gap-4 justify-start'>
        <Button color='red' click={props.close}>
          Cancel
        </Button>
        <Button click={merge} loading={isLoading} disabled={isLoading}>
          Merge
        </Button>
      </div>
    </BaseModal>
  );
};

export default MergeIngredientModal;
