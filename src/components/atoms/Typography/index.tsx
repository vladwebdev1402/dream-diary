import { FC, ReactNode } from 'react';
import clsx from 'clsx';

import style from './style.module.scss';

type Props = {
  variant?: 'h2' | 'h3' | 'paragraph_16' | 'paragraph_14';
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold';
  component?: 'h2' | 'h3' | 'span' | 'div' | 'p';
  display?: 'inline' | 'block';
  children: ReactNode;
};

const Typography: FC<Props> = ({
  variant = 'paragraph_16',
  component = 'div',
  fontWeight = '',
  display = 'block',
  children,
}) => {
  const Tag = component;

  return (
    <Tag
      className={clsx(style[variant], style[display], {
        [style[fontWeight]]: fontWeight !== '',
      })}
    >
      {children}
    </Tag>
  );
};

export { Typography };
