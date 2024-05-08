import clsx from 'clsx';
import { FC } from 'react';

import { LabelTheme } from '@/types';

import style from './style.module.scss';

type Props = {
  theme: LabelTheme;
  checked?: boolean;
  onClick?(): void;
};

const ThemeButton: FC<Props> = ({ theme, checked = false, onClick }) => {
  return (
    <button
      className={clsx(style.theme, {
        [style.theme_gray]: theme === 'gray',
        [style.theme_blue]: theme === 'blue',
        [style.theme_red]: theme === 'red',
        [style.theme_gold]: theme === 'gold',
        [style.theme_green]: theme === 'green',
        [style.theme_checked]: checked,
      })}
      onClick={onClick}
      type="button"
    />
  );
};

export { ThemeButton };
