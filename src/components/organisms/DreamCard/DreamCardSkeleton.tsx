import { FC } from 'react';

import {
  CharacterAvatarSkeleton,
  LabelSkeleton,
  Skeleton,
  Typography,
} from '@/components/atoms';

import style from './style.module.scss';

type Props = {
  withCharacters?: boolean;
  withLabels?: boolean;
  withCover?: boolean;
};

const DreamCardSkeleton: FC<Props> = ({
  withCharacters = false,
  withCover = false,
  withLabels = false,
}) => {
  return (
    <div className={style.card}>
      <Skeleton isInline>
        <Typography component="h3" variant="h3" display="inline">
          Какое-то вот название сна
        </Typography>
      </Skeleton>

      {withCharacters && (
        <div className={style.characters}>
          <CharacterAvatarSkeleton />
          <CharacterAvatarSkeleton />
          <CharacterAvatarSkeleton />
        </div>
      )}

      <div className={style.body}>
        {withCover && (
          <div className={style.cover}>
            <Skeleton width={176} height={176} />
          </div>
        )}

        <Skeleton>
          <div className={style.description}>
            <Typography>
              Описание сна Описание сна Описание сна Описание сна Описание сна
              Описание сна Описание сна Описание сна Описание сна Описание сна
              Описание сна Описание сна Описание сна Описание сна Описание сна
              Описание сна Описание сна Описание сна Описание сна Описание сна
              Описание сна Описание сна Описание сна Описание сна Описание сна
              Описание сна Описание сна Описание сна Описание сна Описание сна
              Описание сна Описание сна Описание сна Описание сна Описание сна
              Описание сна Описание сна Описание сна Описание сна Описание сна
            </Typography>
          </div>
        </Skeleton>
      </div>
      {withLabels && (
        <div className={style.labels}>
          <LabelSkeleton />
          <LabelSkeleton />
          <LabelSkeleton />
        </div>
      )}
    </div>
  );
};

export { DreamCardSkeleton };
