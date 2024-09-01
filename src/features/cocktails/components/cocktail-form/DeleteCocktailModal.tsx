import React, { useState } from 'react';
import BaseModal, { BaseModalProps } from '../../../../shared/components/modals/BaseModal';
import SubsectionHeader from '../../../../shared/components/typography/SubsectionHeader';
import Paragraph from '../../../../shared/components/typography/Paragraph';
import Button from '../../../../shared/components/buttons/Button';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cocktailSlice } from '../../redux/reducer';

type Props = BaseModalProps & {
  id: string;
  close: () => void;
};

const DeleteCocktailModal: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const deleteCocktail = async () => {
    setLoading(true);

    await deleteDoc(doc(firestore, 'cocktails', props.id));
    dispatch(cocktailSlice.actions.deleteCocktail(props.id));

    setLoading(false);
    props.close();
    navigate('/');
  };

  return (
    <BaseModal open={props.open}>
      <SubsectionHeader>Delete cocktail</SubsectionHeader>
      <Paragraph>Are you sure you want to delete this cocktail?</Paragraph>
      <div className='mt-8 flex gap-4 justify-start'>
        <Button click={props.close}>Cancel</Button>
        <Button color='red' click={deleteCocktail} loading={isLoading} disabled={isLoading}>
          Delete
        </Button>
      </div>
    </BaseModal>
  );
};

export default DeleteCocktailModal;
