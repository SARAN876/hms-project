import { Suspense, lazy } from 'react';
import { useRoutes, useLocation, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Usermng from '../pages/usermng';
import DepartmentList from '../pages/departmentList';
import RolesPage from '../pages/rolesPage';
import SignInSide from '../pages/auth/sigin';
// import { PATH_DASHBOARD } from './paths';
import Signup from '../pages/auth/signup';
import Forgot from '../pages/auth/forgot';
import APPBar from '../pages/AppBar';
import AuthGuard from '../components/auth/AuthGuard';
import GuestGuard from '../components/auth/GuestGuard';
import Details from '../pages/userDetails';
import DeptDetails from '../pages/deptDetailes';
import RoleDetails from '../pages/roleDetailes';
import { PATH_DASHBOARD } from './paths';
import NotFound from '../pages/NotFound';

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => {
  const { pathname } = useLocation();
  return (
    <Suspense fallback={<SignInSide isDashboard={pathname.includes('/')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '',
      element: (
        <AuthGuard>
          <APPBar />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_DASHBOARD.dash} replace />, index: true },
        { path: 'dashboard', element: <Dashboard /> },
        {
          path: 'users',
          children: [
            { path: '', element: <Usermng /> },
            { path: ':id', element: <Details /> }
          ]
        },
        {
          path: 'department',
          children: [
            { path: '', element: <DepartmentList /> },
            { path: ':id', element: <DeptDetails /> }
          ]
        },
        {
          path: 'roles',
          children: [
            { path: '', element: <RolesPage /> },
            { path: ':id', element: <RoleDetails /> }
          ]
        }
      ]
    },
    {
      path: '/login',
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      )
    },
    {
      path: '/signup',
      element: (
        <GuestGuard>
          <Signup />
        </GuestGuard>
      )
    },
    {
      path: '/forgot',
      element: (
        <GuestGuard>
          <Forgot />
        </GuestGuard>
      )
    },
    { path: '*', element: <NotFound /> }
  ]);
}
const Login = Loadable(lazy(() => import('../pages/auth/sigin')));
