import {
  CharacterAvatarSkeleton,
  Container,
  LabelSkeleton,
  Skeleton,
  Typography,
} from '@/components/atoms';

import style from './style.module.scss';

const DreamPageSkeleton = () => {
  return (
    <Container>
      <div className={style.dream}>
        <div className={style.head}>
          <div className={style.name}>
            <Skeleton isInline>
              <Typography fontWeight="semibold" variant="h3">
                Длинное название сна
              </Typography>
            </Skeleton>
          </div>
          <div className={style.cover}>
            <Skeleton width={176} height={176} />
          </div>
        </div>
        <div className={style.labels}>
          <LabelSkeleton />
          <LabelSkeleton />
          <LabelSkeleton />
        </div>
        <div className={style.characters}>
          <CharacterAvatarSkeleton withName />
          <CharacterAvatarSkeleton withName />
          <CharacterAvatarSkeleton withName />
        </div>
        <Skeleton height={150} />
      </div>
    </Container>
  );
};

export { DreamPageSkeleton };
