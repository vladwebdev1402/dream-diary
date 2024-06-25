import { FC } from 'react';
import style from './style.module.scss';
import clsx from 'clsx';

type Props = {
  size: number;
  theme?: 'white' | 'black';
};

const Loader: FC<Props> = ({ size, theme = 'white' }) => {
  return (
    <span
      className={clsx(style.loader, {
        [style.loader_white]: theme === 'white',
        [style.loader_black]: theme === 'black',
      })}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export { Loader };
