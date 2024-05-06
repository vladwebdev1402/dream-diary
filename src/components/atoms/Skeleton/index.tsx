import { FC, ReactNode } from 'react';

import style from './style.module.scss';

type Props = {
  children?: ReactNode;
  height?: number;
  width?: number;
};

const Skeleton: FC<Props> = ({ children, height, width }) => {
  return (
    <div
      className={style.skeleton}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      {children}
    </div>
  );
};

export { Skeleton };
