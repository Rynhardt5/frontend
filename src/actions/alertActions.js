import { SET_FORM_ERRORS, REMOVE_FORM_ERRORS } from './types';

export const setFormErrors = (form, errors) => (dispatch) => {
  dispatch({
    type: SET_FORM_ERRORS,
    payload: { form, errors },
  });
};

export const removeFormErrors = (form) => (dispatch) => {
  dispatch({
    type: REMOVE_FORM_ERRORS,
    payload: { form },
  });
};
