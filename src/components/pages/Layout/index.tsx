import { Outlet } from 'react-router-dom';

import { Header } from '@/components';

import style from './style.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <div className={style.main}>
        <Outlet />
      </div>
    </>
  );
};

export { Layout };
