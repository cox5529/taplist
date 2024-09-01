import React from 'react';

import RemoveButton from '../../../../shared/components/buttons/RemoveButton';
import TextField from '../../../../shared/components/form-controls/TextField';

interface Props {
  name: string;
  onRemove: () => void;
}

const InstructionField: React.FC<Props> = (props: Props) => {
  return (
    <div className='flex gap-2 items-start'>
      <TextField name={props.name} fieldType='text' as='textarea' placeholder='Instruction' className='flex-grow' />
      <RemoveButton onRemove={props.onRemove} />
    </div>
  );
};

export default InstructionField;
