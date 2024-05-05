import { FC } from 'react';

import { Character } from '@/types';

import style from './style.module.scss';
import { Typography } from '@/components/atoms';

type Props = {
  character: Character;
  withName?: boolean;
  //   checked?: boolean;
};

const CharacterAvatar: FC<Props> = ({
  character,
  withName = true,
  //   checked = false,
}) => {
  return (
    <div className={style.character}>
      <div className={style.avatar}>
        <img src={character.avatarUrl} />
      </div>
      {withName && (
        <div className={style.name}>
          <Typography variant="paragraph_14">{character.name}</Typography>
        </div>
      )}
    </div>
  );
};
export { CharacterAvatar };
