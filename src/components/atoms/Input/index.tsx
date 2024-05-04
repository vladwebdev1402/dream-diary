import { ComponentPropsWithRef, FC } from 'react';
import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  label: string;
  hint?: string;
  error?: string;
} & ComponentPropsWithRef<'input'>;

const Input: FC<Props> = ({ label, error = '', hint = '', ...props }) => {
  return (
    <div>
      <div className={style.label}>{label}</div>
      <input
        className={clsx(style.input, { [style.input_error]: !!error })}
        {...props}
      />
      {(error || hint) && (
        <div className={clsx(style.hint, { [style.hint_error]: !!error })}>
          {error ? error : hint}
        </div>
      )}
    </div>
  );
};

export { Input };
