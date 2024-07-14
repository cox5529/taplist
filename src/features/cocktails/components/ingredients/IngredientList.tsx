'use client';

import React, { useState } from 'react';
import Button from '../../../../shared/components/buttons/Button';
import Card from '../../../../shared/components/card/Card';
import MergeIngredientModal from './MergeIngredientModal';
import RenameIngredientModal from './RenameIngredientModal';
import { Cocktail } from '../../models/cocktail';
import { Ingredient } from '../../models/ingredient';

type Props = {
  cocktails: Cocktail[];
  ingredients: Ingredient[];
};

const IngredientList: React.FC<Props> = ({ cocktails, ingredients }: Props) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

  const onCheck = (id: string) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((x) => x !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const mergeIngredients = () => {
    setIsMergeModalOpen(true);
  };

  const renameIngredient = () => {
    setIsRenameModalOpen(true);
  };

  const closeModals = () => {
    setIsMergeModalOpen(false);
    setIsRenameModalOpen(false);
    setChecked([]);
  };

  const selectedIngredients = checked.map((id) => ingredients.find((x) => x.id === id)).filter((x) => !!x);

  return (
    <>
      <div className='flex gap-2 pb-4 bg-white rounded sticky top-4 border p-4 mb-4 shadow'>
        <Button disabled={checked.length < 2} click={mergeIngredients}>
          Merge
        </Button>
        <Button disabled={checked.length !== 1} click={renameIngredient}>
          Rename
        </Button>
      </div>
      <div className='flex flex-col gap-2'>
        {ingredients.map((x, i) => (
          <Card key={i}>
            <span className='flex gap-2 items-center'>
              <input id={x.id} type='checkbox' checked={checked.includes(x.id)} onChange={() => onCheck(x.id)} />
              <label htmlFor={x.id}>{x.name}</label>
            </span>
          </Card>
        ))}
      </div>
      <MergeIngredientModal
        open={isMergeModalOpen}
        ingredients={selectedIngredients}
        cocktails={cocktails}
        close={closeModals}
      />
      <RenameIngredientModal open={isRenameModalOpen} ingredient={selectedIngredients[0]} close={closeModals} />
    </>
  );
};

export default IngredientList;
