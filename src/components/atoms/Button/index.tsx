import clsx from 'clsx';
import { ComponentPropsWithRef, FC, ReactNode } from 'react';

import style from './style.module.scss';
import { Typography } from '../Typography';
import { Loader } from '../Loader';

type Props = {
  Icon?: ReactNode;
  variant?: 'contained' | 'text' | 'outlined';
  size?: 'small' | 'big';
  colorTheme?: 'delete';
  fullwidth?: boolean;
  isLoading?: boolean;
} & ComponentPropsWithRef<'button'>;

const Button: FC<Props> = ({
  Icon,
  variant = 'contained',
  size = 'big',
  colorTheme = '',
  fullwidth = false,
  isLoading = false,
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
        [style.button_delete]: colorTheme === 'delete',
        [style.button_loading]: isLoading,
      })}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {Icon && <div>{Icon}</div>}
      {!isLoading && <Typography fontWeight="semibold">{children}</Typography>}
      {isLoading && (
        <Loader size={22} theme={variant === 'contained' ? 'white' : 'black'} />
      )}
    </button>
  );
};
export { Button };
