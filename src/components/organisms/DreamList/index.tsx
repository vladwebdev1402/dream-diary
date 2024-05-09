import { useEffect, useMemo } from 'react';

import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { ErrorMessage, Typography } from '@/components/atoms';
import { myUID } from '@/constants';

import style from './style.module.scss';
import { DreamCard } from '../DreamCard';
import { groupByTimestamp } from './helpers';
import { DreamListSkeleton } from './DreamListSkeleton';

const DreamList = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector(
    StoreSelectors.dreamList.selectAll,
  );
  const characters = useAppSelector(StoreSelectors.characterList.selectData);
  const isCharactersLoading = useAppSelector(
    StoreSelectors.characterList.selectIsLoading,
  );
  const labels = useAppSelector(StoreSelectors.labelsList.selectData);
  const isLabelsLoading = useAppSelector(
    StoreSelectors.labelsList.selectIsLoading,
  );
  const groupedDreams = useMemo(() => groupByTimestamp(data), [data]);

  useEffect(() => {
    dispatch(StoreActions.dreamList.getAllDreams(myUID));
    if (characters === null)
      dispatch(StoreActions.characterList.getAllCharacters(myUID));
    if (labels === null) dispatch(StoreActions.labelsList.getAllLabels(myUID));
  }, []);

  if (isLoading || isLabelsLoading || isCharactersLoading)
    return <DreamListSkeleton />;

  if (error)
    return <ErrorMessage title="Произошла ошибка" description={error} />;

  if (data && data.length === 0)
    return (
      <ErrorMessage title="Список снов пуст" description="Создайте новый сон" />
    );

  return (
    <div className={style.main_list}>
      {Object.keys(groupedDreams).map((item) => (
        <div key={item}>
          <Typography>{item}</Typography>
          <div className={style.list}>
            {groupedDreams[item].map((dream) => (
              <DreamCard key={dream.id} dream={dream} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { DreamList };
