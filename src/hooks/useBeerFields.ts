import { useMemo } from 'react';

import { FieldProps } from '../components/form-controls/GenericForm';
import { Beer, beerFields } from '../models/beer';
import { useScales } from './useScales';

export function useBeerFields(): FieldProps<Beer>[] {
  const scales = useScales();

  return useMemo(() => beerFields(scales), [scales]);
}
