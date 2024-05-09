import { FC } from 'react';

import { CharacterAvatarSkeleton } from './CharacterAvatarSkeleton';
import style from './style.module.scss';

type Props = {
  withName?: boolean;
};

const CharacterAvatarListSkeleton: FC<Props> = ({ withName }) => {
  return (
    <div className={style.list}>
      <CharacterAvatarSkeleton withName={withName} />
      <CharacterAvatarSkeleton withName={withName} />
      <CharacterAvatarSkeleton withName={withName} />
      <CharacterAvatarSkeleton withName={withName} />
    </div>
  );
};

export { CharacterAvatarListSkeleton };
