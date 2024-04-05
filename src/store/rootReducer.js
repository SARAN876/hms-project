import { combineReducers } from '@reduxjs/toolkit';
import message from './messageSlice';
import loading from './loaderSlice';
import users from '../store/userSlice';
import department from '../store/departmentSlice';
import role from '../store/roleSlice';

const createReducer = (asyncReducers) =>
  combineReducers({
    message,
    loading,
    users,
    role,
    department,
    ...asyncReducers
  });

export default createReducer;
