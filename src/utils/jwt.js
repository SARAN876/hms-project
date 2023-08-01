import jwtDecode from 'jwt-decode';
import history from '../configurations/@history';
import { PATH_AUTH } from '../routes/paths';
import axiosConfig from './axios';
// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    localStorage.removeItem('accessToken');
    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axiosConfig.defaults.headers.common.Accept = 'application/json';
    axiosConfig.defaults.headers.common['Content-Type'] = 'application/json';
    axiosConfig.defaults.headers.common.Authorization = `Bearer${accessToken}`;

    const { exp } = jwtDecode(accessToken);
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.clear();
    delete axiosConfig.defaults.headers.common.Authorization;
    history.push(PATH_AUTH.login);
  }
};

export { isValidToken, setSession };
