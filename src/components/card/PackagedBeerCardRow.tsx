import React from 'react';

type Props = React.PropsWithChildren;

const PackagedBeerCardRow: React.FC<Props> = (props: Props) => {
  return <div className='flex gap-x-8 flex-wrap'>{props.children}</div>;
};

export default PackagedBeerCardRow;
