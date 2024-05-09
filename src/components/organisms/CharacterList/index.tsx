import { useEffect } from 'react';

import { ErrorMessage } from '@/components/atoms';
import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { myUID } from '@/constants';

import style from './style.module.scss';
import { CharacterCard } from '../CharacterCard';
import { CharacterListSkeleton } from './CharacterListSkeleton';

const CharacterList = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector(
    StoreSelectors.characterList.selectAll,
  );

  useEffect(() => {
    dispatch(StoreActions.characterList.getAllCharacters(myUID));
  }, []);

  if (error !== '')
    return (
      <div className={style.error}>
        <ErrorMessage title="Произошла ошибка" description={error} />
      </div>
    );

  if (isLoading) return <CharacterListSkeleton />;

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
