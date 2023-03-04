import React from 'react';

import Paragraph from '../typography/Paragraph';

type Props = React.PropsWithChildren & { title?: string; className?: string };

const PackagedBeerCardField: React.FC<Props> = (props: Props) => {
  return (
    <div className={props.className}>
      <Paragraph>
        {props.title && <span>{props.title}: </span>}
        {props.children}
      </Paragraph>
    </div>
  );
};

export default PackagedBeerCardField;
