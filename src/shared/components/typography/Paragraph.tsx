import React from 'react';

import cx from 'classnames';

type Props = { className?: string } & React.PropsWithChildren;

const Paragraph: React.FC<Props> = (props: Props) => {
  return <p className={cx(props.className, '')}>{props.children}</p>;
};

export default Paragraph;
