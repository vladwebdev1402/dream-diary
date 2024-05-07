import { Skeleton, Typography } from '@/components/atoms';

import style from './style.module.scss';

const CharacterCardSkeleton = () => {
  return (
    <div>
      <Skeleton height={176} />
      <div className={style.name}>
        <Skeleton>
          <Typography variant="h3">Имя персонажа</Typography>
        </Skeleton>
      </div>
    </div>
  );
};

export { CharacterCardSkeleton };
