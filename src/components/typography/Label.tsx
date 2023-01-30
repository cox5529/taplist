import React from 'react';

import cx from 'classnames';

type Props = React.PropsWithChildren & {
  for: string;
  className?: string;
};

const Label: React.FC<Props> = (props: Props) => {
  return (
    <label className={cx('text-sm', props.className)} htmlFor={props.for}>
      {props.children}
    </label>
  );
};

export default Label;
