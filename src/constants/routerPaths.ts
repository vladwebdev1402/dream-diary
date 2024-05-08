const ROUTER_PATHS = {
  main: '/',
  labels: '/labels',
  characters: '/characters',
  character: '/characters/:id',
  characterCreate: '/create/character',
  dreams: '/dreams',
};

const getNavigateRoute = {
  goCharacter: (id: string) => ROUTER_PATHS.characters + `/${id}`,
  goDream: (id: string) => ROUTER_PATHS.dreams + `/${id}`,
};

export { ROUTER_PATHS, getNavigateRoute };
