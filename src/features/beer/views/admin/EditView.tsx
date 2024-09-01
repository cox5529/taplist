import React, { useMemo } from 'react';

import { DocumentReference, doc, setDoc } from '@firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useNavigate, useParams } from 'react-router-dom';

import { firestore } from '../../../../firebase';
import LoadingBox from '../../../../shared/components/LoadingBox';
import Button from '../../../../shared/components/buttons/Button';
import Card from '../../../../shared/components/card/Card';
import { toISODateString } from '../../../../shared/utils/date-utils';
import EditBeerForm from '../../components/forms/EditBeerForm';
import { useBeers } from '../../hooks/useBeers';
import { useScales } from '../../hooks/useScales';
import { Beer } from '../../models/beer';

const EditView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data] = useDocumentDataOnce<Beer>(doc(firestore, 'beer', id ?? '') as DocumentReference<Beer>);

  const beer: Beer | undefined = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return { ...data, brewDate: toISODateString(data.brewDate), packageDate: toISODateString(data.packageDate) };
  }, [data]);

  const [beers, beersLoaded] = useBeers();
  const scales = useScales();

  const goBack = () => navigate('/');

  const updateBeer = async (beer: Beer): Promise<void> => {
    await setDoc(doc(firestore, 'beer', beer.id ?? ''), beer);
  };

  const assignTap = async (tap: number): Promise<void> => {
    if (!beer) {
      return;
    }

    const currentAssignment = beers.find((x) => x.keg === tap);
    if (currentAssignment) {
      currentAssignment.keg = null;
      updateBeer(currentAssignment);
    }

    beer.keg = tap;
    updateBeer(beer);
  };

  const assignScale = async (ip: string): Promise<void> => {
    if (!beer) {
      return;
    }

    const currentAssignment = beers.find((x) => x.scale === ip);
    if (currentAssignment) {
      currentAssignment.scale = undefined;
      updateBeer(currentAssignment);
    }

    beer.scale = ip;
    updateBeer(beer);
  };

  return beer && beersLoaded ? (
    <Card>
      <EditBeerForm assignTap={assignTap} assignScale={assignScale} beer={beer} beers={beers} scales={scales} />
      <Button className='mt-16' click={goBack}>
        Back
      </Button>
    </Card>
  ) : (
    <LoadingBox />
  );
};

export default EditView;
