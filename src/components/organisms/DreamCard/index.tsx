import { FC } from 'react';

import { Character, Dream } from '@/types';
import CharacterJPG from '@/assets/images/ava1.jpg';

import style from './style.module.scss';
import { CharacterAvatar, Typography } from '@/components/atoms';
import { Link } from 'react-router-dom';
import { getNavigateRoute } from '@/constants';

const character: Character = {
  id: '132123',
  avatarUrl: CharacterJPG,
  name: 'Имя персонажа',
};

type Props = {
  dream: Dream;
};

const DreamCard: FC<Props> = ({ dream }) => {
  return (
    <div className={style.card}>
      <Link to={getNavigateRoute.goDream(dream.id)} className={style.link}>
        <Typography component="h3" variant="h3" display="inline">
          {dream.name}
        </Typography>
      </Link>

      {dream.characters && (
        <div className={style.characters}>
          {dream.characters.map((item) => (
            <CharacterAvatar
              key={item}
              character={character}
              withName={false}
            />
          ))}
        </div>
      )}
      <div className={style.body}>
        {dream.cover && (
          <div className={style.cover}>
            <img src={dream.cover} alt="Обложка" />
          </div>
        )}
        <div className={style.description}>
          <Typography>{dream.description}</Typography>
        </div>
      </div>
    </div>
  );
};

export { DreamCard };
