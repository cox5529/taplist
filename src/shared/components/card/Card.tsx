import React from 'react';

import cx from 'classnames';

type Props = React.PropsWithChildren & { className?: string; onClick?: () => void; href?: string };

const Card: React.FC<Props> = (props: Props) => {
  const className = cx(
    'p-4 border rounded-xl shadow-md print:border print:shadow-none bg-white',
    { 'cursor-pointer hover:bg-slate-200': !!props.onClick || !!props.href },
    props.className,
  );

  if (props.href) {
    return (
      <a className={className} onClick={props.onClick} href={props.href}>
        {props.children}
      </a>
    );
  }

  return (
    <div className={className} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Card;
