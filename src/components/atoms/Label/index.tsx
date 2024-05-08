import { FC, MouseEvent, ReactNode } from 'react';
import clsx from 'clsx';

import { LabelTheme } from '@/types';
import CrossSVG from '@/assets/decoration/cross.svg?react';

import style from './style.module.scss';
import { LabelSkeleton } from './LabelSkeleton';

type Props = {
  theme: LabelTheme;
  children: ReactNode;
  onDelete?(): void;
  onClick?(): void;
};

const Label: FC<Props> = ({
  theme,
  children,
  onDelete,
  onClick = () => {},
}) => {
  const onDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete && onDelete();
  };

  return (
    <div
      className={clsx(style.label, {
        [style.label_gray]: theme === 'gray',
        [style.label_blue]: theme === 'blue',
        [style.label_red]: theme === 'red',
        [style.label_gold]: theme === 'gold',
        [style.label_green]: theme === 'green',
        [style.label_delete]: onDelete,
      })}
    >
      <button className={clsx(style.button)} onClick={onClick}>
        {children}
      </button>
      {onDelete && (
        <button className={style.delete} onClick={onDeleteClick}>
          <CrossSVG className={style.icon} />
        </button>
      )}
    </div>
  );
};

export { Label };
export { LabelSkeleton };
