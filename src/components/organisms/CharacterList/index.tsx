import { useEffect } from 'react';

import { ErrorMessage } from '@/components/atoms';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { LocalStorageService } from '@/api';

import style from './style.module.scss';
import { CharacterCard } from '../CharacterCard';
import { CharacterListSkeleton } from './CharacterListSkeleton';

const CharacterList = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector(
    StoreSelectors.characterList.selectAll,
  );

  useEffect(() => {
    dispatch(
      StoreActions.characterList.getAllCharacters(LocalStorageService.getUID()),
    );
  }, []);

  if (error !== '')
    return (
      <div className={style.error}>
        <ErrorMessage title="Произошла ошибка" description={error} />
      </div>
    );

  if (isLoading) return <CharacterListSkeleton />;

  if (data && data.length === 0)
    return (
      <div className={style.error}>
        <ErrorMessage
          title="Список персонажей пуст"
          description={'Создайте нового персонажа'}
        />
      </div>
    );

  if (data)
    return (
      <div className={style.list}>
        {data.map((item) => (
          <CharacterCard key={item.id} character={item} />
        ))}
      </div>
    );
};

export { CharacterList };
