import { FC, ReactNode } from 'react';

import style from './style.module.scss';
import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  height?: number;
  width?: number;
  isRound?: boolean;
  isInline?: boolean;
};

const Skeleton: FC<Props> = ({
  height,
  width,
  isRound = false,
  isInline = false,
  children,
}) => {
  return (
    <div
      className={clsx(style.skeleton, {
        [style.skeleton_rounded]: isRound,
        [style.skeleton_inline]: isInline,
      })}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      {children}
    </div>
  );
};

export { Skeleton };
