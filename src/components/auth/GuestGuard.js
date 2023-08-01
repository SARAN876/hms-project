import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// components
// import LoadingScreen from '../loading-screen';
import useAuthContext from '../hooks/useAuth';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_DASHBOARD.dashboard);
    }
  }, [isAuthenticated]);

  return <> {children} </>;
}
