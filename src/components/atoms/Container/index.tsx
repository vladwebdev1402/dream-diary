import { FC, ReactNode } from 'react';
import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  children: ReactNode;
  variant?: 'small' | 'large';
};

const Container: FC<Props> = ({ variant = 'large', children }) => {
  return (
    <div
      className={clsx(style.container, {
        [style.container_large]: variant === 'large',
        [style.container_small]: variant === 'small',
      })}
    >
      {children}
    </div>
  );
};

export { Container };
