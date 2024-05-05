import { StoreSelectors, useAppSelector } from '@/store';

import style from './style.module.scss';
import { DreamCard } from '../DreamCard';

const DreamList = () => {
  const data = useAppSelector(StoreSelectors.dreamList.selectData);

  return (
    <div className={style.list}>
      {data.map((item) => (
        <DreamCard key={item.id} dream={item} />
      ))}
    </div>
  );
};

export { DreamList };
