import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Register user
export const register = (values) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:4000/user/register', values);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {}
};
