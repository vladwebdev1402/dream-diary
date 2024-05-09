import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  Button,
  CharacterAvatar,
  Container,
  ErrorMessage,
  Typography,
} from '@/components/atoms';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { ROUTER_PATHS, myUID } from '@/constants';

import style from './style.module.scss';
import { LabelCard } from '@/components/molecules';
import { DreamPageSkeleton } from './DreamPageSkeleton';
import { DreamForm } from '@/components/organisms';
import { DreamFormData } from '@/types';

const DreamPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState<'show' | 'edit'>('show');
  const characters = useAppSelector(StoreSelectors.characterList.selectData);
  const labels = useAppSelector(StoreSelectors.labelsList.selectData);

  const charactersLoading = useAppSelector(
    StoreSelectors.characterList.selectIsLoading,
  );
  const labelsLoading = useAppSelector(
    StoreSelectors.labelsList.selectIsLoading,
  );

  const { data, error, isLoading, isActionLoading } = useAppSelector(
    StoreSelectors.dream.selectAll,
  );
  const params = useParams<{ id: string }>();

  const onDeleteClick = async () => {
    if (data) {
      await dispatch(StoreActions.dream.deleteDream(data?.id));
      navigate(ROUTER_PATHS.main);
    }
  };

  const onSuccessSubmit = async (dream: DreamFormData) => {
    if (data) {
      await dispatch(
        StoreActions.dream.editDream({ ...dream, id: data.id, userUid: myUID }),
      );
      setStep('show');
    }
  };

  useEffect(() => {
    dispatch(StoreActions.dream.getDream(params.id || ''));
    if (characters === null)
      dispatch(StoreActions.characterList.getAllCharacters(myUID));
    if (labels === null) dispatch(StoreActions.labelsList.getAllLabels(myUID));
  }, [params]);

  if (error)
    return (
      <Container>
        <ErrorMessage title="Произошла ошибка" description={error} />
      </Container>
    );

  if (isLoading || labelsLoading || charactersLoading)
    return <DreamPageSkeleton />;

  if (step === 'show' && data && characters && labels)
    return (
      <Container>
        <div className={style.dream}>
          <div className={style.head}>
            <div className={style.name}>
              <Typography fontWeight="semibold" variant="h3">
                {data.name}
              </Typography>
            </div>
            {data.cover && (
              <div className={style.cover}>
                <img src={data.cover} alt="Обложка сна" />
              </div>
            )}
          </div>
          <div className={style.labels}>
            {data.labels &&
              data.labels.map((item) => {
                const label = labels.find((subitem) => subitem.id === item);
                return label ? (
                  <LabelCard key={label.id} label={label} />
                ) : null;
              })}
          </div>
          <div className={style.characters}>
            {data.characters &&
              data.characters.map((item) => {
                const character = characters.find(
                  (subitem) => subitem.id === item,
                );
                return character ? (
                  <CharacterAvatar
                    key={character.id}
                    character={character}
                    withName
                  />
                ) : null;
              })}
          </div>
          <Typography>{data.description}</Typography>
          <div className={style.buttons}>
            <Button
              fullwidth
              variant="outlined"
              onClick={() => setStep('edit')}
            >
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
        </div>
      </Container>
    );

  if (data && step === 'edit')
    return (
      <Container>
        <DreamForm
          formType="edit"
          defaultValue={data}
          isLoading={isActionLoading}
          onCancel={() => setStep('show')}
          onSuccessSubmit={onSuccessSubmit}
        />
      </Container>
    );
};

export { DreamPage };