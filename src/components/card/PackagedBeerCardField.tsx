import React from 'react';

import Paragraph from '../typography/Paragraph';
import Small from '../typography/Small';

type Props = React.PropsWithChildren & { title: string; className?: string };

const PackagedBeerCardField: React.FC<Props> = (props: Props) => {
  return (
    <div className={props.className}>
      <Small>{props.title}</Small>
      <Paragraph>{props.children}</Paragraph>
    </div>
  );
};

export default PackagedBeerCardField;
