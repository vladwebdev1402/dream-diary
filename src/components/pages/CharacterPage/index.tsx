import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { CharacterInfo } from '@/components/organisms';
import { Button, Container } from '@/components/atoms';
import { StoreActions, useAppDispatch } from '@/store';

import style from './style.module.scss';

const CharacterPage = () => {
  const [step, setStep] = useState<'show' | 'edit'>('show');

  const onStepClick = () => {
    if (step === 'show') setStep('edit');
    else setStep('show');
  };

  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(StoreActions.character.getCharacter(params.id || ''));
  }, [params.id]);

  return (
    <Container>
      {step === 'show' && <CharacterInfo />}
      <Button onClick={onStepClick}>сменить</Button>
    </Container>
  );
};

export { CharacterPage };
