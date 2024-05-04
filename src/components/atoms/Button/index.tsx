import clsx from 'clsx';
import { ComponentPropsWithRef, FC } from 'react';

import style from './style.module.scss';

type Props = {
  variant?: 'contained' | 'text' | 'outlined';
  fullwidth?: boolean;
} & ComponentPropsWithRef<'button'>;

const Button: FC<Props> = ({
  variant = 'contained',
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
      })}
      {...props}
    >
      {children}
    </button>
  );
};
export { Button };
