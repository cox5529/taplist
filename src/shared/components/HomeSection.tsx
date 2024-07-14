import React from 'react';

import Button from './buttons/Button';
import SectionHeader from './typography/SectionHeader';
import AuthenticationGuard from './auth/AuthenticationGuard';

type Props = React.PropsWithChildren & {
  header: string;
  addRoute?: string;
  addButtonText?: string;
};

const HomeSection: React.FC<Props> = (props: Props) => {
  return (
    <>
      <section className='py-8'>
        <div className='flex gap-2 items-start justify-between'>
          <SectionHeader>{props.header}</SectionHeader>
          {props.addRoute && (
            <AuthenticationGuard>
              <Button to={props.addRoute}>{props.addButtonText ?? 'New'}</Button>
            </AuthenticationGuard>
          )}
        </div>
        {props.children}
      </section>
      <hr />
    </>
  );
};

export default HomeSection;
