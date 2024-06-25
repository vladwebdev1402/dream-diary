const ROUTER_PATHS = {
  main: '/',
  labels: '/labels',
  characters: '/characters',
  character: '/characters/:id',
  characterCreate: '/create/character',
  dreams: '/dreams',
  dream: '/dreams/:id',
  dreamCreate: '/create/dreams',
  signIn: '/auth',
  signUp: '/signup',
};

const getNavigateRoute = {
  goCharacter: (id: string) => ROUTER_PATHS.characters + `/${id}`,
  goDream: (id: string) => ROUTER_PATHS.dreams + `/${id}`,
};

export { ROUTER_PATHS, getNavigateRoute };
