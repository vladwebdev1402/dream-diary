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
import { StoreSelectors, useAppSelector } from '@/store';

const createRouter = (isAuth: boolean) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        {isAuth && (
          <>
            <Route path={ROUTER_PATHS.main} element={<MainPage />} />
            <Route path={ROUTER_PATHS.character} element={<CharacterPage />} />
            <Route
              path={ROUTER_PATHS.characterCreate}
              element={<CharacterCreatePage />}
            />
            <Route
              path={ROUTER_PATHS.characters}
              element={<CaharctersPage />}
            />
            <Route path={ROUTER_PATHS.labels} element={<LabelsPage />} />
            <Route path={ROUTER_PATHS.dreamCreate} element={<DreamCreate />} />
            <Route path={ROUTER_PATHS.dream} element={<DreamPage />} />
          </>
        )}
        {!isAuth && (
          <>
            <Route path={ROUTER_PATHS.signIn} element={<SignInPage />} />
            <Route path={ROUTER_PATHS.signUp} element={<SignUpPage />} />
            <Route path="*" element={<SignUpPage />} />
          </>
        )}
      </Route>,
    ),
  );

const Router = () => {
  const isAuth = useAppSelector(StoreSelectors.auth.selectIsAuth);
  return <RouterProvider router={createRouter(isAuth)} />;
};

export { Router };
