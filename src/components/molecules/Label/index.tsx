import { FC, ReactNode } from 'react';
import clsx from 'clsx';

import CrossSVG from '@/assets/decoration/cross.svg?react';

import style from './style.module.scss';

type Props = {
  theme: 'gray' | 'blue' | 'red' | 'gold' | 'green';
  children: ReactNode;
  isShowDelete?: boolean;
};

const Label: FC<Props> = ({ theme, isShowDelete = false, children }) => {
  return (
    <div
      className={clsx(style.label, {
        [style.label_gray]: theme === 'gray',
        [style.label_blue]: theme === 'blue',
        [style.label_red]: theme === 'red',
        [style.label_gold]: theme === 'gold',
        [style.label_green]: theme === 'green',
        [style.label_delete]: isShowDelete,
      })}
    >
      <button className={clsx(style.button)}>{children}</button>
      {isShowDelete && (
        <button className={style.delete}>
          <CrossSVG className={style.icon} />
        </button>
      )}
    </div>
  );
};

export { Label };
