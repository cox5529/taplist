import React from 'react';

import cx from 'classnames';

type Props = React.PropsWithChildren & { className?: string; onClick?: () => void };

const Card: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={cx(
        'p-4 border rounded-xl shadow-md print:border print:shadow-none bg-white',
        { 'cursor-pointer hover:bg-slate-200': !!props.onClick },
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Card;
