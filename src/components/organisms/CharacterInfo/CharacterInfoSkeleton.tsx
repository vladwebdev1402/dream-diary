import { Skeleton, Typography } from '@/components/atoms';
import style from './style.module.scss';
const CharacterInfoSkeleton = () => {
  return (
    <div className={style.info}>
      <div className={style.head}>
        <Skeleton isInline>
          <Typography variant="h2" component="h2">
            Имя персонажа
          </Typography>
        </Skeleton>

        <div className={style.avatar}>
          <Skeleton width={156} height={156}></Skeleton>
        </div>
      </div>
      <div className={style.description}>
        <Skeleton height={200} />
      </div>
    </div>
  );
};

export { CharacterInfoSkeleton };
