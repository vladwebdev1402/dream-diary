import { FC, ReactNode } from 'react';

import style from './style.module.scss';

type Props = {
  children: ReactNode;
};

const Container: FC<Props> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export { Container };
