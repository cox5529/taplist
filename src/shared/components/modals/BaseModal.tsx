import React from 'react';

import Card from '../../../shared/components/card/Card';

export interface BaseModalProps {
  open?: boolean;
}

type Props = BaseModalProps & {
  className?: string;
} & React.PropsWithChildren;

const BaseModal: React.FC<Props> = (props: Props) => {
  return props.open ? (
    <div className='inset-0 fixed bg-black bg-opacity-20 z-50 xl:flex items-center justify-center p-16'>
      <Card className={props.className}>{props.children}</Card>
    </div>
  ) : (
    <></>
  );
};

export default BaseModal;
