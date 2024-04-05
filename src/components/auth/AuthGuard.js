import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../../pages/auth/sigin';
import useAuthContext from '../hooks/useAuth';

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      if (pathname !== requestedLocation) {
        setRequestedLocation(pathname);
        navigate(pathname);
      }
    } else {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, navigate, requestedLocation]);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <>{children}</>;
}
