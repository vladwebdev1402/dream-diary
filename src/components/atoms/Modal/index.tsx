import { FC, MouseEvent, ReactNode, useEffect } from 'react';
import clsx from 'clsx';

import style from './style.module.scss';
import { Typography } from '../Typography';

type Props = {
  title: string;
  isOpen: boolean;
  onClose(): void;
  children: ReactNode;
};

const Modal: FC<Props> = ({ title, isOpen, onClose, children }) => {
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];

    if (isOpen) body.classList.add('stop-scroll');
    else body.classList.remove('stop-scroll');
  }, [isOpen]);

  return (
    <div
      className={clsx(style.modal, { [style.modal_open]: isOpen })}
      onClick={onClose}
    >
      <div
        className={style.container}
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className={style.head}>
          <Typography variant="h3">{title}</Typography>
          <button className={style.close} onClick={onClose} />
        </div>
        <div className={style.body}>{children}</div>
      </div>
    </div>
  );
};

export { Modal };
