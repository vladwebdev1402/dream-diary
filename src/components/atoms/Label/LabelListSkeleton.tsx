import { FC } from 'react';

import { LabelSkeleton } from './LabelSkeleton';

import style from './style.module.scss';

type Props = {
  count: number;
};

const LabelListSkeleton: FC<Props> = ({ count }) => {
  return (
    <div className={style.list}>
      {new Array(count).fill(undefined).map(() => (
        <LabelSkeleton key={Math.random()} />
      ))}
    </div>
  );
};

export { LabelListSkeleton };
