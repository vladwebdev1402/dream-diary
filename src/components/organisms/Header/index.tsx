import { Link } from 'react-router-dom';

import {
  StoreActions,
  StoreSelectors,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import { ROUTER_PATHS } from '@/constants';
import { Button, Container, HeaderLink } from '@/components/atoms';
import LogoSVG from '@/assets/decoration/logo.svg?react';

import style from './style.module.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(StoreSelectors.auth.selectIsAuth);
  const onLogoutButtonClick = () => {
    dispatch(StoreActions.auth.logout());
  };
  return (
    <header className={style.header}>
      <Container>
        <div className={style.body}>
          <Link to={ROUTER_PATHS.main}>
            <LogoSVG />
          </Link>
          {isAuth && (
            <div className={style.account}>
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
              <Button variant="text" size="small" onClick={onLogoutButtonClick}>
                Выйти
              </Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export { Header };
