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
  CharacterPage,
  DreamCreate,
  DreamPage,
  LabelsPage,
  Layout,
  MainPage,
  SignInPage,
  SignUpPage,
} from '@/components/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path={ROUTER_PATHS.main} element={<MainPage />} />
      <Route path={ROUTER_PATHS.character} element={<CharacterPage />} />
      <Route
        path={ROUTER_PATHS.characterCreate}
        element={<CharacterCreatePage />}
      />
      <Route path={ROUTER_PATHS.characters} element={<CaharctersPage />} />
      <Route path={ROUTER_PATHS.labels} element={<LabelsPage />} />
      <Route path={ROUTER_PATHS.dreamCreate} element={<DreamCreate />} />
      <Route path={ROUTER_PATHS.dream} element={<DreamPage />} />
      <Route path={ROUTER_PATHS.signIn} element={<SignInPage />} />
      <Route path={ROUTER_PATHS.signUp} element={<SignUpPage />} />
    </Route>,
  ),
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export { Router };
