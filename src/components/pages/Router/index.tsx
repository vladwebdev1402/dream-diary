import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from '../Layout';
import { ROUTER_PATHS } from '@/constants';
import { MainPage } from '../MainPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={ROUTER_PATHS.main} element={<MainPage />} />
    </Route>,
  ),
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export { Router };
