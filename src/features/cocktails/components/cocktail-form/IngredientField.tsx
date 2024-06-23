import React from 'react';

import RemoveButton from '../../../../shared/components/buttons/RemoveButton';
import Dropdown from '../../../../shared/components/form-controls/Dropdown';
import TextField from '../../../../shared/components/form-controls/TextField';
import Typeahead from '../../../../shared/components/form-controls/Typeahead';
import { Unit } from '../../models/cocktail';
import { Ingredient } from '../../models/ingredient';

type Props = {
  baseName: string;
  ingredients: Ingredient[];
  onRemove: () => void;
};

const IngredientField: React.FC<Props> = (props: Props) => {
  const units = Object.keys(Unit).map((x) => ({ value: x, text: x }));

  const ingredientKeys = props.ingredients.map((x) => ({ text: x.name, value: x.name }));

  return (
    <div className='flex gap-2 items-start'>
      <TextField name={`${props.baseName}.quantity`} fieldType='number' placeholder='Quantity' className='basis-20' />
      <Dropdown name={`${props.baseName}.unit`} className='basis-32' keys={units} />
      <Typeahead
        labelName={`${props.baseName}.ingredient.name`}
        valueName={`${props.baseName}.ingredientId`}
        placeholder='Name'
        className='flex-grow'
        keys={ingredientKeys}
      />
      <RemoveButton onRemove={props.onRemove} />
    </div>
  );
};

export default IngredientField;
