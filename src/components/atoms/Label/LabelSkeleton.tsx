import { Skeleton } from '../Skeleton';

import style from './style.module.scss';

const LabelSkeleton = () => {
  return (
    <div className={style.skelet}>
      <Skeleton
        isInline
        width={Math.floor(45 + Math.random() * (90 + 1 - 45))}
        height={28}
      />
    </div>
  );
};

export { LabelSkeleton };
