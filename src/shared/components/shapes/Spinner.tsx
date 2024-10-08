import React from 'react';

import cx from 'classnames';

interface Props {
  className?: string;
}

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div
      className={cx(props.className, 'border-current border-4 border-b-transparent rounded-full animate-spin')}
    ></div>
  );
};

export default Spinner;
