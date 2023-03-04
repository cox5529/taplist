import React from 'react';

type Props = React.PropsWithChildren;

const PackagedBeerCardRow: React.FC<Props> = (props: Props) => {
  return <div className='flex gap-8'>{props.children}</div>;
};

export default PackagedBeerCardRow;
