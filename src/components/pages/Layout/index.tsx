import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Header } from '@/components';
import { store } from '@/store';

import style from './style.module.scss';

const Layout = () => {
  return (
    <Provider store={store}>
      <Header />
      <div className={style.main}>
        <Outlet />
      </div>
    </Provider>
  );
};

export { Layout };
