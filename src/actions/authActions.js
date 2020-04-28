import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setFormErrors, removeFormErrors } from './alertActions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
} from './types';

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('http://localhost:4000/user/current');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = (values, setSubmitting) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:4000/user/register', values);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(removeFormErrors('register'));
    setSubmitting(true);
    // reroute
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
    setSubmitting(false);
    dispatch(setFormErrors('register', err.response.data.errors));
  }
};

export const login = (values, setSubmitting) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:4000/user/login', values);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(removeFormErrors('login'));
    setSubmitting(true);
    // reroute
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    setSubmitting(false);
    dispatch(setFormErrors('login', err.response.data.errors));
  }
};
