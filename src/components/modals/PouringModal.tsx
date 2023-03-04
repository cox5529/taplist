import React, { useEffect, useState } from 'react';

import { Beer } from '../../models/beer';
import { Scale } from '../../models/scale';
import Glass from '../beer/Glass';
import BaseModal from './BaseModal';

type Props = {
  beer: Beer;
  scale: Scale;
};

const PouringModal: React.FC<Props> = (props: Props) => {
  const calories = (props.scale.lastPour / 12) * (props.beer.calories ?? 0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (props.scale.isPouring && !open) {
      setOpen(true);
      timer && clearTimeout(timer);
    } else if (!props.scale.isPouring && open) {
      timer = setTimeout(() => setOpen(false), 10000);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [open, props.scale.isPouring]);

  return (
    <BaseModal className='w-full h-full flex items-center flex-col p-8 gap-12' open={open}>
      <h2 className='text-3xl'>Now pouring</h2>
      <h1 className='text-7xl'>{props.beer.name}</h1>
      <Glass srm={props.beer.srm} fill={(props.scale.lastPour / 12) * 100} />
      <div className='text-center'>
        <h3 className='text-2xl'>Pour volume: {props.scale.lastPour.toFixed(1)} ounces</h3>
        <h4>{calories.toFixed(0)} Calories</h4>
      </div>
    </BaseModal>
  );
};

export default PouringModal;
