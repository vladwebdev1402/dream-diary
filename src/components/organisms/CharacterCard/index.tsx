import { Link } from 'react-router-dom';
import { FC } from 'react';

import { Character } from '@/types';

import style from './style.module.scss';
import { Typography } from '@/components/atoms';

type Props = {
  character: Character;
};

const CharacterCard: FC<Props> = ({ character }) => {
  return (
    <Link to={'/change-me'} className={style.card}>
      <div className={style.avatar}>
        <img src={character.avatarUrl} alt="Аватар" />
      </div>
      <div className={style.name}>
        <Typography variant="h3">{character.name}</Typography>
      </div>
    </Link>
  );
};

export { CharacterCard };
