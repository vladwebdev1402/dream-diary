import { ComponentPropsWithRef, FC } from 'react';
import { Typography } from '../Typography';
import style from './style.module.scss';

const AddCharacterButton: FC<ComponentPropsWithRef<'button'>> = ({
  ...props
}) => {
  return (
    <button className={style.add} {...props} type="button">
      <span className={style.icon} />
      <Typography component="span" variant="paragraph_14">
        Добавить
      </Typography>
    </button>
  );
};

export { AddCharacterButton };
