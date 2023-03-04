import React from 'react';

import Card from '../card/Card';

type Props = {
  className?: string;
  open?: boolean;
} & React.PropsWithChildren;

const BaseModal: React.FC<Props> = (props: Props) => {
  return props.open ? (
    <div className='inset-0 fixed bg-black bg-opacity-20 z-50 xl:flex items-center justify-center p-16 hidden'>
      <Card className={props.className}>{props.children}</Card>
    </div>
  ) : (
    <></>
  );
};

export default BaseModal;
