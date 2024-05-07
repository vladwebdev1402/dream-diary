import { StoreSelectors, useAppSelector } from '@/store';
import Stub from '@/assets/images/avatar-stub.png';
import { ErrorMessage, Typography } from '@/components/atoms';

import style from './style.module.scss';
import { CharacterInfoSkeleton } from './CharacterInfoSkeleton';

const CharacterInfo = () => {
  const { data, error, isLoading } = useAppSelector(
    StoreSelectors.character.selectAll,
  );

  if (error)
    return (
      <ErrorMessage title="Произошла ошибка" description={'asdasdasadsdas'} />
    );

  if (isLoading) return <CharacterInfoSkeleton />;

  if (data)
    return (
      <div className={style.info}>
        <div className={style.head}>
          <Typography variant="h2" component="h2">
            {data.name}
          </Typography>
          <div className={style.avatar}>
            <img src={data.avatarUrl || Stub} alt="Аватар" />
          </div>
        </div>
        {data.description && (
          <div className={style.description}>
            <Typography>{data.description}</Typography>
          </div>
        )}
      </div>
    );
};

export { CharacterInfo };
