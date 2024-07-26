import React from 'react';

import cx from 'classnames';
import { Link } from 'react-router-dom';

import Spinner from '../../../shared/components/shapes/Spinner';

type Props = React.PropsWithChildren & {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  color?: 'blue' | 'red' | 'gray';
  click?: () => void;
} & (
    | {
        to?: string;
        type?: undefined;
      }
    | { to?: undefined; type?: 'button' | 'submit' | 'reset' }
  );

const Button: React.FC<Props> = (props: Props) => {
  const className = cx(props.className, 'bg-sky-800 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors', {
    'bg-gray-300 pointer-events-none cursor-not-allowed': props.disabled,
    'bg-red-500 hover:bg-red-600': props.color === 'red' && !props.disabled,
    'bg-gray-500 hover:bg-gray-600': props.color === 'gray' && !props.disabled,
  });

  return props.to ? (
    <Link to={props.to} className={className} onClick={props.click}>
      {props.children}
    </Link>
  ) : (
    <button className={className} type={props.type ?? 'button'} onClick={props.click} disabled={props.disabled}>
      {props.loading ? (
        <div className='flex items-center justify-center'>
          <Spinner className='w-6 h-6' />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
