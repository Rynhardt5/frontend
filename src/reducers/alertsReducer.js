import { SET_FORM_ERRORS, REMOVE_FORM_ERRORS } from '../actions/types';

const initialState = {
  formErrors: {
    registration: null,
    login: null,
  },
  toastMessage: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FORM_ERRORS:
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.payload.form]: action.payload.errors,
        },
      };
    case REMOVE_FORM_ERRORS:
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          [action.payload.form]: null,
        },
      };
    default:
      return state;
  }
}
