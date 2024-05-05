const ROUTER_PATHS = {
  main: '/',
  tags: '/tags',
  characters: '/characters',
  dreams: '/dreams',
};

const getNavigateRoute = {
  goCharacter: (id: string) => ROUTER_PATHS.characters + `/${id}`,
  goDream: (id: string) => ROUTER_PATHS.dreams + `/${id}`,
};

export { ROUTER_PATHS, getNavigateRoute };
