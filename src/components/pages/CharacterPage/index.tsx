import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Button, Container } from '@/components/atoms';
import { CharacterForm } from '@/components/molecules';
import { CharacterInfo } from '@/components/organisms';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';

import style from './style.module.scss';
import { ROUTER_PATHS } from '@/constants';
import { CharacterFormData } from '@/types';

const CharacterPage = () => {
  const navigate = useNavigate();
  const data = useAppSelector(StoreSelectors.character.selectData);
  const isActionLoading = useAppSelector(
    StoreSelectors.character.selectIsActionLoading,
  );
  const [step, setStep] = useState<'show' | 'edit'>('show');

  const onStepClick = () => {
    if (step === 'show') setStep('edit');
    else setStep('show');
  };

  const onDeleteClick = async () => {
    try {
      await dispatch(StoreActions.character.deleteCharacter(params.id || ''));
      navigate(ROUTER_PATHS.characters);
    } catch (e) {}
  };

  const onEditSubmit = async (data: CharacterFormData) => {
    try {
      await dispatch(
        StoreActions.character.editCharacter({ id: params.id || '', ...data }),
      );
      onStepClick();
    } catch (e) {}
  };

  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(StoreActions.character.getCharacter(params.id || ''));
  }, [params.id]);

  return (
    <Container>
      {step === 'show' && <CharacterInfo />}
      {step === 'show' && (
        <div className={style.buttons}>
          <Button onClick={onStepClick} fullwidth>
            Редактировать
          </Button>
          <Button
            fullwidth
            colorTheme="delete"
            onClick={onDeleteClick}
            isLoading={isActionLoading}
          >
            Удалить
          </Button>
        </div>
      )}
      {step === 'edit' && (
        <CharacterForm
          defaultValue={data || undefined}
          formType="edit"
          onCancel={onStepClick}
          onSuccessSubmit={onEditSubmit}
          isLoading={isActionLoading}
        />
      )}
    </Container>
  );
};

export { CharacterPage };
