import clsx from 'clsx';
import { ComponentPropsWithRef, FC } from 'react';

import style from './style.module.scss';
import { Typography } from '../Typography';

type Props = {
  variant?: 'contained' | 'text' | 'outlined';
  size?: 'small' | 'big';
  fullwidth?: boolean;
} & ComponentPropsWithRef<'button'>;

const Button: FC<Props> = ({
  variant = 'contained',
  size = 'big',
  fullwidth = false,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(style.button, {
        [style.button_contained]: variant === 'contained',
        [style.button_outlined]: variant === 'outlined',
        [style.button_text]: variant === 'text',
        [style.button_fullwidth]: fullwidth,
        [style.button_big]: size === 'big',
        [style.button_small]: size === 'small',
      })}
      {...props}
    >
      <Typography fontWeight="semibold">{children}</Typography>
    </button>
  );
};
export { Button };
