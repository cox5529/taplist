import React from 'react';

import SectionHeader from './typography/SectionHeader';

type Props = React.PropsWithChildren & {
  header: string;
};

const HomeSection: React.FC<Props> = (props: Props) => {
  return (
    <>
      <section className='py-8'>
        <SectionHeader>{props.header}</SectionHeader>
        {props.children}
      </section>
      <hr />
    </>
  );
};

export default HomeSection;
