import React from 'react';
import cx from 'classnames';
import SubsectionHeader from './SubsectionHeader';

type Props = React.PropsWithChildren & {
  header: string;
  className?: string;
};

const SubsectionHeaderWithButton: React.FC<Props> = (props: Props) => {
  return (
    <div className={cx(props.className, 'flex justify-between items-center pb-2 gap-2')}>
      <SubsectionHeader>{props.header}</SubsectionHeader>
      {props.children}
    </div>
  );
};

export default SubsectionHeaderWithButton;
