import React from 'react';

import Button from '../../../../src/shared/components/buttons/Button';
import Card from '../../../../src/shared/components/card/Card';
import { toISODateString } from '../../../../src/shared/utils/date-utils';
import EditBeerForm from '../../../../src/features/beer/components/forms/EditBeerForm';
import { useBeers } from '../../../../src/features/beer/hooks/useBeers';
import { useScales } from '../../../../src/features/beer/hooks/useScales';
import { Beer } from '../../../../src/features/beer/models/beer';
import { Page } from '../../../../src/types';
import { useBeer } from '../../../../src/features/beer/hooks/useBeer';

type Params = {
  id: string;
};

const EditView: Page<Params> = async (props) => {
  const id = props.params.id;

  const data = await useBeer(id);

  let beer: Beer = {
    ...data,
    brewDate: toISODateString(data.brewDate),
    packageDate: toISODateString(data.packageDate),
  };

  const beers = await useBeers();
  const scales = await useScales();

  return (
    <Card>
      <EditBeerForm beer={beer} beers={beers} scales={scales} />
      <Button className='mt-16' to='/'>
        Back
      </Button>
    </Card>
  );
};

export default EditView;
