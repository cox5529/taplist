import React from 'react';

import { useNavigate } from 'react-router-dom';

import Paragraph from '../typography/Paragraph';
import Card from './Card';

type Props = {
  otherLink: string;
  text: string;
};

const FeatureSwitchCard = (props: Props) => {
  const navigate = useNavigate();
  const click = (): void => navigate(props.otherLink);

  return (
    <Card
      onClick={click}
      className='cursor-pointer hover:bg-slate-200 grow-0 shrink-0 lg:hidden flex flex-col break-inside-avoid'
    >
      <div className='flex gap-4 items-center justify-center'>
        <Paragraph>{props.text}</Paragraph>
      </div>
    </Card>
  );
};

export default FeatureSwitchCard;
