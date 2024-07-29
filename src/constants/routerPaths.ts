const root = '/dream-diary';

const ROUTER_PATHS = {
  main: root,
  labels: root + '/labels',
  characters: root + '/characters',
  character: root + '/characters/:id',
  characterCreate: root + '/create/character',
  dreams: root + '/dreams',
  dream: root + '/dreams/:id',
  dreamCreate: root + '/create/dreams',
  signIn: root + '/auth',
  signUp: root + '/signup',
};

const getNavigateRoute = {
  goCharacter: (id: string) => ROUTER_PATHS.characters + `/${id}`,
  goDream: (id: string) => ROUTER_PATHS.dreams + `/${id}`,
};

export { ROUTER_PATHS, getNavigateRoute };
