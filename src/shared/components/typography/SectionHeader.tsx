import React from 'react';

import cx from 'classnames';

type Props = React.PropsWithChildren & {
  className?: string;
};

const SectionHeader: React.FC<Props> = (props: Props) => {
  return <h3 className={cx('text-2xl mb-2', props.className)}>{props.children}</h3>;
};

export default SectionHeader;
