import React from 'react';
import type { NextPage } from 'next';

type Props = React.PropsWithChildren;

const CocktailLayout: NextPage<Props> = ({ children }) => {
  return <div className='py-8 max-w-[500px] mx-auto flex flex-col'>{children}</div>;
};

export default CocktailLayout;
