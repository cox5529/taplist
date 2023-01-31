import React from 'react';

import cx from 'classnames';

type Props = React.PropsWithChildren & {
  className?: string;
};

const SubsectionHeader: React.FC<Props> = (props: Props) => {
  return <h4 className={cx('text-xl mb-2', props.className)}>{props.children}</h4>;
};

export default SubsectionHeader;
