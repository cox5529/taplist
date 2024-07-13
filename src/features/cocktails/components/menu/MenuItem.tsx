import React from 'react';

import Card from '../../../../shared/components/card/Card';
import Paragraph from '../../../../shared/components/typography/Paragraph';
import SubsectionHeader from '../../../../shared/components/typography/SubsectionHeader';
import { Cocktail } from '../../models/cocktail';
import { useRouter } from 'next/router';

type Props = {
  cocktail: Cocktail;
};

const MenuItem: React.FC<Props> = ({ cocktail }: Props) => {
  const router = useRouter();

  const click = (): void => {
    router.push(`/cocktails/${cocktail.id}`)
  };

  return (
    <Card onClick={click}>
      <SubsectionHeader>{cocktail.name}</SubsectionHeader>
      <Paragraph className='text-sm'>{cocktail.description}</Paragraph>
    </Card>
  );
};

export default MenuItem;
