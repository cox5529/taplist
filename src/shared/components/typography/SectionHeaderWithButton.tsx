import React from 'react';

import cx from 'classnames';

import Button from '../buttons/Button';
import SectionHeader from './SectionHeader';

type Props = React.PropsWithChildren & {
  header: string;
  backButton?: boolean;
  className?: string;
};

const SectionHeaderWithButton: React.FC<Props> = (props: Props) => {
  return (
    <div className={cx(props.className, 'flex justify-between items-center pb-2 gap-2')}>
      <SectionHeader>{props.header}</SectionHeader>
      <span className='flex-grow'></span>
      {props.children}
      {props.backButton && (
        <Button to='/' className='w-16 flex items-center justify-center'>
          Back
        </Button>
      )}
    </div>
  );
};

export default SectionHeaderWithButton;
