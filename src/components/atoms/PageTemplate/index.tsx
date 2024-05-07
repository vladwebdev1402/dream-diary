import { FC, ReactNode } from 'react';

import { Typography } from '../Typography';
import { Button } from '../Button';
import style from './style.module.scss';

type Props = {
  title: string;
  buttonText?: string;
  onClick?(): void;
  children: ReactNode;
};

const PageTemplate: FC<Props> = ({
  title,
  buttonText = '',
  onClick = () => {},
  children,
}) => {
  return (
    <>
      <div className={style.head}>
        <Typography component="h2" variant="h2">
          {title}
        </Typography>
        {buttonText && (
          <Button variant="outlined" size="small" onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </div>
      <div className={style.body}>{children}</div>
    </>
  );
};

export { PageTemplate };
