import React from 'react';

import Button from './Button';

interface Props {
  onRemove: () => void;
}

const RemoveButton: React.FC<Props> = (props: Props) => {
  return (
    <Button className='bg-red-500 border-red-500 hover:bg-red-700 leading-4 border' click={props.onRemove}>
      X
    </Button>
  );
};

export default RemoveButton;
