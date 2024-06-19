import React from 'react';

import cx from 'classnames';
import { Link } from 'react-router-dom';

import Spinner from '../../../shared/components/shapes/Spinner';

type Props = React.PropsWithChildren & {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  click?: () => void;
} & (
    | {
        to?: string;
        type?: undefined;
      }
    | { to?: undefined; type?: 'button' | 'submit' | 'reset' }
  );

const Button: React.FC<Props> = (props: Props) => {
  const className = cx(props.className, 'bg-sky-800 text-white px-4 py-2 rounded hover:bg-sky-600', {
    'pointer-events-none cursor-not-allowed': props.disabled,
  });

  return props.to ? (
    <Link to={props.to} className={className} onClick={props.click}>
      {props.children}
    </Link>
  ) : (
    <button className={className} type={props.type ?? 'button'} onClick={props.click} disabled={props.disabled}>
      {props.loading ? <Spinner className='w-4 h-4' /> : props.children}
    </button>
  );
};

export default Button;
