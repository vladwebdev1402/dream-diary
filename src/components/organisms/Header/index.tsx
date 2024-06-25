import { Link } from 'react-router-dom';

import { StoreSelectors, useAppSelector } from '@/store';
import { ROUTER_PATHS } from '@/constants';
import { Container, HeaderLink } from '@/components/atoms';
import LogoSVG from '@/assets/decoration/logo.svg?react';

import style from './style.module.scss';

const Header = () => {
  const isAuth = useAppSelector(StoreSelectors.auth.selectIsAuth);

  return (
    <header className={style.header}>
      <Container>
        <div className={style.body}>
          <Link to={ROUTER_PATHS.main}>
            <LogoSVG />
          </Link>
          {isAuth && (
            <nav>
              <ul className={style.links}>
                <li>
                  <HeaderLink to={ROUTER_PATHS.characters}>
                    Персонажи
                  </HeaderLink>
                </li>
                <li>
                  <HeaderLink to={ROUTER_PATHS.labels}>Теги</HeaderLink>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
};

export { Header };
