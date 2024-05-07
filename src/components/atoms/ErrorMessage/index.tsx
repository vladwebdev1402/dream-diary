import { FC } from 'react';

import { Typography } from '../Typography';

import style from './style.module.scss';

type Props = {
  title: string;
  description: string;
};

const ErrorMessage: FC<Props> = ({ title, description }) => {
  return (
    <div className={style.error}>
      <Typography variant="h2">{title}</Typography>
      <div className={style.description}>
        <Typography>{description}</Typography>
      </div>
    </div>
  );
};

export { ErrorMessage };
