import React from 'react';

import Button from './Button';

const RemoveButton: React.FC = () => {
  return (
    <Button className='border-sky-800 leading-4 border w-16 flex items-center justify-center' type='submit'>
      Go!
    </Button>
  );
};

export default RemoveButton;
