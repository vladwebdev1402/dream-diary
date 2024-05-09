import { FC } from 'react';

import style from './style.module.scss';
import { Skeleton } from '../Skeleton';
import { Typography } from '../Typography';

type Props = {
  withName?: boolean;
};

const CharacterAvatarSkeleton: FC<Props> = ({ withName = false }) => {
  return (
    <div className={style.character}>
      <div className={style.avatar}>
        <Skeleton height={64} width={64} />
      </div>
      {withName && (
        <div className={style.name}>
          <Skeleton isInline>
            <Typography variant="paragraph_14">Имя персонажа</Typography>
          </Skeleton>
        </div>
      )}
    </div>
  );
};

export { CharacterAvatarSkeleton };
