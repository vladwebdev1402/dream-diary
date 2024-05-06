import { Link } from 'react-router-dom';
import { FC } from 'react';

import { Character } from '@/types';
import { Typography } from '@/components/atoms';
import { getNavigateRoute } from '@/constants';
import Stub from '@/assets/images/avatar-stub.png';

import style from './style.module.scss';
import { CharacterCardSkeleton } from './CharacterCardSkeleton';

type Props = {
  character: Character;
};

const CharacterCard: FC<Props> = ({ character }) => {
  return (
    <Link
      to={getNavigateRoute.goCharacter(character.id)}
      className={style.card}
    >
      <div className={style.avatar}>
        <img src={character.avatarUrl || Stub} alt="Аватар" />
      </div>
      <div className={style.name}>
        <Typography variant="h3">{character.name}</Typography>
      </div>
    </Link>
  );
};

export { CharacterCard, CharacterCardSkeleton };
