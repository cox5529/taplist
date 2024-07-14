import React from 'react';

export type PageProps<Params, Query> = {
  params: Params;
  searchParams: Query;
};

export type LayoutProps = React.PropsWithChildren;

export type Page<Params = {}, Query = {}> =
  | ((props: PageProps<Params, Query>) => React.ReactElement)
  | ((props: PageProps<Params, Query>) => Promise<React.ReactElement>);

export type Layout =
| ((props: LayoutProps) => React.ReactElement)
| ((props: LayoutProps) => Promise<React.ReactElement>);
