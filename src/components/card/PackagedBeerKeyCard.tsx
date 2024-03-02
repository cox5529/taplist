import React from 'react';

import BottleAndKeg from '../beer/BottleAndKeg';
import BottledNoKeg from '../beer/BottledNoKeg';
import Keg from '../beer/Keg';
import Paragraph from '../typography/Paragraph';
import SubsectionHeader from '../typography/SubsectionHeader';
import Card from './Card';

const PackagedBeerKeyCard: React.FC = () => {
  return (
    <Card>
      <SubsectionHeader>Key</SubsectionHeader>
      <div className='grid grid-cols-3 gap-x-4 gap-y-2 items-center text-center'>
        <Paragraph>Packaged in keg only</Paragraph>
        <Paragraph>Packaged in bottle only</Paragraph>
        <Paragraph>Packaged in bottle and keg</Paragraph>
        <Keg
          className='justify-self-center'
          beer={{
            abv: 0,
            srm: 5,
            originalGravity: 1,
            finalGravity: 1,
            ibu: 0,
            name: '',
            brewDate: '',
            style: '',
            description: '',
            packageDate: '',
            type: 'packaged',
          }}
        />
        <BottledNoKeg capColor={'#333333'} srm={5} />
        <BottleAndKeg
          capColor={'#333333'}
          beer={{
            abv: 0,
            srm: 5,
            originalGravity: 1,
            finalGravity: 1,
            ibu: 0,
            name: '',
            brewDate: '',
            style: '',
            description: '',
            packageDate: '',
            type: 'packaged',
          }}
        />
      </div>
    </Card>
  );
};

export default PackagedBeerKeyCard;
