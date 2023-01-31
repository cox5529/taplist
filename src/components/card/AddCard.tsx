import React from 'react';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import Card from './Card';

type Props = { className?: string; onClick?: () => void };

const AddCard: React.FC<Props> = (props: Props) => {
  return (
    <Card
      className={cx('flex items-center justify-center cursor-pointer hover:bg-slate-200', props.className)}
      onClick={props.onClick}
    >
      <FontAwesomeIcon className='w-32 h-32' icon={faPlus} />
    </Card>
  );
};

export default AddCard;
