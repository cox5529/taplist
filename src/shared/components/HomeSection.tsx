import React from 'react';

import { auth } from '../../firebase';
import Button from './buttons/Button';
import SectionHeader from './typography/SectionHeader';
import { useAuthState } from '../hooks/useAuthState';

type Props = React.PropsWithChildren & {
  header: string;
  addRoute?: string;
  addButtonText?: string;
};

const HomeSection: React.FC<Props> = (props: Props) => {
  const [user] = useAuthState();
  return (
    <>
      <section className='py-8'>
        <div className='flex gap-2 items-start justify-between'>
          <SectionHeader>{props.header}</SectionHeader>
          {props.addRoute && user && <Button to={props.addRoute}>{props.addButtonText ?? 'New'}</Button>}
        </div>
        {props.children}
      </section>
      <hr />
    </>
  );
};

export default HomeSection;
