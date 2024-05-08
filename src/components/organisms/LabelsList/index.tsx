import { useEffect } from 'react';

import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { myUID } from '@/constants';

import style from './style.module.scss';
import { LabelListSkeleton } from './LabelListSkeleton';
import { ErrorMessage, Label } from '@/components/atoms';

const LabelsList = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector(
    StoreSelectors.labelsList.selectAll,
  );

  useEffect(() => {
    dispatch(StoreActions.labelsList.getAllLabels(myUID));
  }, [myUID]);

  if (isLoading) return <LabelListSkeleton />;

  if (error)
    return <ErrorMessage title="Произошла ошибка" description={error} />;

  if (!error && !isLoading && data.length === 0)
    return (
      <ErrorMessage
        title="Список тегов пуст"
        description="Создайте новые теги"
      />
    );

  return (
    <div className={style.list}>
      {data.map((item) => (
        <Label theme={item.theme} key={item.id} onDelete={() => {}}>
          {item.name}
        </Label>
      ))}
    </div>
  );
};

export { LabelsList };
