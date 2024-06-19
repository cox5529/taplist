import React from 'react';

import cx from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = React.PropsWithChildren &
  (
    | {
        click?: undefined;
        to?: string;
      }
    | { click?: () => void; to?: undefined }
  );

const NavbarButton: React.FC<Props> = (props: Props) => {
  const className = 'px-4 hover:bg-zinc-800 flex items-center justify-center';

  return props.to ? (
    <NavLink to={props.to} className={({ isActive }): string => cx(className, { 'bg-zinc-700': isActive })}>
      {props.children}
    </NavLink>
  ) : (
    <button onClick={props.click} type='button' className={className}>
      {props.children}
    </button>
  );
};

export default NavbarButton;
