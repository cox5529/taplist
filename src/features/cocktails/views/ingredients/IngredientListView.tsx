import React, { useState } from 'react';
import { useIngredients } from '../../hooks/useIngredients';
import SectionHeader from '../../../../shared/components/typography/SectionHeader';
import SectionHeaderWithButton from '../../../../shared/components/typography/SectionHeaderWithButton';
import LoadingBox from '../../../../shared/components/LoadingBox';
import Card from '../../../../shared/components/card/Card';
import Button from '../../../../shared/components/buttons/Button';
import { useCocktails } from '../../hooks/useCocktails';
import MergeIngredientModal from '../../components/ingredients/MergeIngredientModal';
import RenameIngredientModal from '../../components/ingredients/RenameIngredientModal';

const IngredientListView: React.FC = () => {
  const [ingredients, areIngredientsLoading] = useIngredients();
  const [cocktails, areCocktailsLoading] = useCocktails({});

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

  if (areIngredientsLoading || areCocktailsLoading) {
    return <LoadingBox />;
  }

  return (
    <div>
      <SectionHeaderWithButton header='Ingredients' backButton />
      <div className='flex gap-2 pb-4'>
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
    </div>
  );
};

export default IngredientListView;
