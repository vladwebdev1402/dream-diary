import { LabelSkeleton } from '@/components/atoms';

import style from './style.module.scss';

const LabelListSkeleton = () => {
  return (
    <div className={style.list}>
      {new Array(50).fill(undefined).map(() => (
        <LabelSkeleton key={Math.random()} />
      ))}
    </div>
  );
};

export { LabelListSkeleton };
