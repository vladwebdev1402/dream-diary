import { FC, MouseEvent, ReactNode } from 'react';
import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  title: string;
  isOpen: boolean;
  onClose(): void;
  children: ReactNode;
};

const Modal: FC<Props> = ({ title, isOpen, onClose, children }) => {
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
          {title} <button className={style.close} onClick={onClose} />
        </div>
        <div className={style.body}>{children}</div>
      </div>
    </div>
  );
};

export { Modal };
