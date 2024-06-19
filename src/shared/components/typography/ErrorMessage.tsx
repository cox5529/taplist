import React from 'react';

import cx from 'classnames';

type Props = React.PropsWithChildren & {
  className?: string;
};

const ErrorMessage: React.FC<Props> = (props: Props) => {
  return <p className={cx('text-sm text-red-700 h-6 mt-2 max-w-full truncate', props.className)}>{props.children}</p>;
};

export default ErrorMessage;
