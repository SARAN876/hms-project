// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}
const ROOTS_DASHBOARD = '';
const ROOTS_AUTH = '';
// ----------------------------------------------------------------------
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  signup: path(ROOTS_AUTH, '/signup')
};
export const PATH_PAGE = {
  page403: '/403',
  page404: '/404',
  page500: '/500'
};
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dash: path(ROOTS_DASHBOARD, '/dashboard'),
  users: path(ROOTS_DASHBOARD, '/users'),
  department: path(ROOTS_DASHBOARD, '/departments'),
  roles: path(ROOTS_DASHBOARD, '/roles')
};
