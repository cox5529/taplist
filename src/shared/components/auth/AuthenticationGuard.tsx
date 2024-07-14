'use client';

import React, { useEffect } from 'react';
import { useAuthState } from '../../hooks/useAuthState';
import { useRouter } from 'next/navigation';

type Props = React.PropsWithChildren & {
  redirect?: string;
  invert?: boolean;
};

const AuthenticationGuard: React.FC<Props> = (props: Props) => {
  const [user, isAuthLoading] = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (isAuthLoading || !props.redirect) {
      return;
    }

    if (!props.invert && !user) {
      router.push(props.redirect);
    } else if (props.invert && user) {
      router.push(props.redirect);
    }
  }, [isAuthLoading, router, props.redirect, user]);

  return <>{user && props.children}</>;
};

export default AuthenticationGuard;
