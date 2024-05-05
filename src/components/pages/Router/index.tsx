import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { ROUTER_PATHS } from '@/constants';
import {
  CaharctersPage,
  CharacterCreatePage,
  Layout,
  MainPage,
} from '@/components/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={ROUTER_PATHS.main} element={<MainPage />} />
      <Route path={ROUTER_PATHS.characters} element={<CaharctersPage />} />
      <Route
        path={ROUTER_PATHS.characterCreate}
        element={<CharacterCreatePage />}
      />
    </Route>,
  ),
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export { Router };
