import { useMemo } from 'react';

import { StoreSelectors, useAppSelector } from '@/store';
import { Typography } from '@/components/atoms';

import style from './style.module.scss';
import { DreamCard } from '../DreamCard';
import { groupByTimestamp } from './helpers';

const DreamList = () => {
  const data = useAppSelector(StoreSelectors.dreamList.selectData);

  const groupedDreams = useMemo(() => groupByTimestamp(data), [data]);

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
