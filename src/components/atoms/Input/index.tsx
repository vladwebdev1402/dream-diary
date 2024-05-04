import { ComponentPropsWithRef, FC } from 'react';
import clsx from 'clsx';

import style from './style.module.scss';
import { Typography } from '../Typography';

type Props = {
  label: string;
  hint?: string;
  error?: string;
} & ComponentPropsWithRef<'input'>;

const Input: FC<Props> = ({ label, error = '', hint = '', ...props }) => {
  return (
    <div>
      <Typography variant="paragraph_14">{label}</Typography>
      <input
        className={clsx(style.input, { [style.input_error]: !!error })}
        {...props}
      />
      {(error || hint) && (
        <div className={clsx(style.hint, { [style.hint_error]: !!error })}>
          <Typography variant="paragraph_14">{error ? error : hint}</Typography>
        </div>
      )}
    </div>
  );
};

export { Input };
