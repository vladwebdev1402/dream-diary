import { ComponentPropsWithRef, FC } from 'react';

import { Typography } from '../Typography';
import style from './style.module.scss';

// коммент

const AddTagButton: FC<ComponentPropsWithRef<'button'>> = ({ ...props }) => {
  return (
    <button className={style.button} {...props} type="button">
      <Typography variant="paragraph_14" component="span">
        Добавить
      </Typography>
    </button>
  );
};

export { AddTagButton };
