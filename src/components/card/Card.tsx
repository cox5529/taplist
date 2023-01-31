import React from 'react';

import cx from 'classnames';

type Props = React.PropsWithChildren & { className?: string; onClick?: () => void };

const Card: React.FC<Props> = (props: Props) => {
  return (
    <div className={cx('bg-white text-black p-4 rounded shadow', props.className)} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Card;
