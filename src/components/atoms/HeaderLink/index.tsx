import { FC, ReactNode } from 'react';
import { Link, useMatch } from 'react-router-dom';
import clsx from 'clsx';

import { Typography } from '../Typography';
import style from './style.module.scss';

type Props = {
  to: string;
  children: ReactNode;
};

const HeaderLink: FC<Props> = ({ to, children }) => {
  const match = useMatch(to);
  return (
    <Link to={to} className={clsx(style.link, { [style.link_active]: match })}>
      <Typography component="span">{children}</Typography>
    </Link>
  );
};

export { HeaderLink };
