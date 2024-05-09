import { FC } from 'react';

import { Character } from '@/types';
import Stub from '@/assets/images/avatar-stub.png';

import style from './style.module.scss';
import { Typography } from '@/components/atoms';
import clsx from 'clsx';

type Props = {
  character: Character;
  withName?: boolean;
  checked?: boolean;
};

const CharacterAvatar: FC<Props> = ({
  character,
  withName = true,
  checked = false,
}) => {
  return (
    <div
      className={clsx(style.character, { [style.character_checked]: checked })}
    >
      <div className={style.avatar}>
        <img src={character.avatarUrl || Stub} />
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
