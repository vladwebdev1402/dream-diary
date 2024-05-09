import { FC } from 'react';

import { CharacterAvatar } from '@/components/atoms';
import { Character } from '@/types';

import style from './style.module.scss';

type Props = {
  character: Character;
  checked: boolean;
  onClick: (id: string) => void;
};

const ButtonCharacterAvatar: FC<Props> = ({ character, checked, onClick }) => {
  return (
    <button
      onClick={() => onClick(character.id)}
      className={style.button}
      type="button"
    >
      <CharacterAvatar character={character} checked={checked} />
    </button>
  );
};

export { ButtonCharacterAvatar };
