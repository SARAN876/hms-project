import axiosConfig from '../utils/axios';
import axios from 'axios';

const handleResponse = (error) => {
  if (
    error.response &&
    (error.response.status === 500 ||
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 422)
  ) {
    return error.response && error.response.data;
  }
  return error.response && error.response.data;
};
export const fetchLoginService = (data) =>
  axios
    .post(process.env.REACT_APP_BASE_URL + `/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response)
    .catch(handleResponse);
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};
export const fetchSignupService = (data) =>
  axios
    .post(process.env.REACT_APP_BASE_URL + `/auth/signup`, data, { headers })
    .then((response) => response.data)
    .catch(handleResponse);
export const fetchForgotService = (data) =>
  axiosConfig
    .post(`/auth/forgot-password`, data)
    .then((response) => response.data)
    .catch(handleResponse);
export const updateProfile = (data) => {
  axiosConfig
    .post(`/auth/user/:id`, data)
    .then((response) => response.data)
    .catch(handleResponse);
};

export const featchProfileService = () =>
  axiosConfig
    .get(`/auth/profile`)
    .then((response) => response.data)
    .catch(handleResponse);
