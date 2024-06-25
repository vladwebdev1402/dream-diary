import { ComponentPropsWithRef, FC, forwardRef } from 'react';
import clsx from 'clsx';

import style from './style.module.scss';
import { Typography } from '../Typography';

type Props = {
  label: string;
  hint?: string;
  error?: string;
};
const Input = forwardRef<
  HTMLInputElement,
  Props & ComponentPropsWithRef<'input'>
>(({ label, error = '', hint = '', ...props }, ref) => {
  return (
    <div>
      <Typography variant="paragraph_14">{label}</Typography>
      <input
        className={clsx(style.input, { [style.input_error]: !!error })}
        {...props}
        ref={ref}
      />

      {(error || hint) && (
        <div className={clsx(style.hint, { [style.hint_error]: !!error })}>
          <Typography variant="paragraph_14">{error ? error : hint}</Typography>
        </div>
      )}
    </div>
  );
});

const Textarea: FC<Props & ComponentPropsWithRef<'textarea'>> = ({
  label,
  error = '',
  hint = '',
  ...props
}) => {
  return (
    <div>
      <Typography variant="paragraph_14">{label}</Typography>
      <textarea
        className={clsx(style.input, style.textarea, {
          [style.input_error]: !!error,
        })}
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

export { Input, Textarea };
