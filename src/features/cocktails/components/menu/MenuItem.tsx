import React from 'react';

import { useNavigate } from 'react-router-dom';

import Card from '../../../../shared/components/card/Card';
import Paragraph from '../../../../shared/components/typography/Paragraph';
import SubsectionHeader from '../../../../shared/components/typography/SubsectionHeader';
import { Cocktail } from '../../models/cocktail';

interface Props {
  cocktail: Cocktail;
}

const MenuItem: React.FC<Props> = ({ cocktail }: Props) => {
  const navigate = useNavigate();

  const click = (): void => navigate(`/cocktails/${cocktail.id}`);

  return (
    <Card onClick={click}>
      <SubsectionHeader>{cocktail.name}</SubsectionHeader>
      <Paragraph className='text-sm'>{cocktail.description}</Paragraph>
    </Card>
  );
};

export default MenuItem;
