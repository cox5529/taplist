import React from 'react';

import cx from 'classnames';

type Props = React.PropsWithChildren & {
  className?: string;
};

const Small: React.FC<Props> = (props: Props) => {
  return <p className={cx('text-[0.75em]', props.className)}>{props.children}</p>;
};

export default Small;
