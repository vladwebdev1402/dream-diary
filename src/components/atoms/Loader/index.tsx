import { FC } from 'react';
import style from './style.module.scss';

type Props = {
  size: number;
};

const Loader: FC<Props> = ({ size }) => {
  return (
    <span
      className={style.loader}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export { Loader };
