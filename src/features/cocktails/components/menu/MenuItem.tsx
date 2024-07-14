import React from 'react';

import Card from '../../../../shared/components/card/Card';
import Paragraph from '../../../../shared/components/typography/Paragraph';
import SubsectionHeader from '../../../../shared/components/typography/SubsectionHeader';
import { Cocktail } from '../../models/cocktail';

type Props = {
  cocktail: Cocktail;
};

const MenuItem: React.FC<Props> = ({ cocktail }: Props) => {
  return (
    <Card href={`/cocktails/${cocktail.id}`}>
      <SubsectionHeader>{cocktail.name}</SubsectionHeader>
      <Paragraph className='text-sm'>{cocktail.description}</Paragraph>
    </Card>
  );
};

export default MenuItem;
