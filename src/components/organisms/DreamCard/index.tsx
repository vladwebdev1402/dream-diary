import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Dream } from '@/types';
import { getNavigateRoute } from '@/constants';
import { CharacterAvatar, Label, Typography } from '@/components/atoms';

import style from './style.module.scss';
import { DreamCardSkeleton } from './DreamCardSkeleton';
import { StoreSelectors, useAppSelector } from '@/store';

type Props = {
  dream: Dream;
};

const DreamCard: FC<Props> = ({ dream }) => {
  const characters = useAppSelector(StoreSelectors.characterList.selectData);
  const labels = useAppSelector(StoreSelectors.labelsList.selectData);

  return (
    <div className={style.card}>
      <Link to={getNavigateRoute.goDream(dream.id)} className={style.link}>
        <Typography component="h3" variant="h3" display="inline">
          {dream.name}
        </Typography>
      </Link>

      {characters && dream.characters && (
        <div className={style.characters}>
          {dream.characters.map((item) => {
            const character = characters.find((subItem) => subItem.id === item);
            if (character)
              return (
                <CharacterAvatar
                  character={character}
                  key={character.id}
                  withName={false}
                />
              );
            return null;
          })}
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
      {labels && dream.labels && (
        <div className={style.labels}>
          {dream.labels.map((item) => {
            const label = labels.find((subItem) => subItem.id === item);
            if (label)
              return (
                <Label theme={label.theme} key={label.id}>
                  {label.name}
                </Label>
              );
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export { DreamCard, DreamCardSkeleton };
