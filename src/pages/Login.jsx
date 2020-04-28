import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { setFormErrors, removeFormErrors } from '../actions/alertActions';
import FormErrors from '../components/FormErrors';
import axios from 'axios';

const mapStateToProps = (state) => {
  return { formErrors: state.alerts.formErrors };
};

export const Login = connect(mapStateToProps, {
  setFormErrors,
  removeFormErrors,
})(function ({ setFormErrors, removeFormErrors, formErrors }) {
  return (
    <div className="registration">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Please enter your password';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Please enter your password';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // send to server

          try {
            const response = await axios.post(
              'http://localhost:4000/user/login',
              values
            );

            if (response.data.success) {
              console.log(response.data);
              setSubmitting(false);
              removeFormErrors('login');
            }
          } catch (err) {
            setFormErrors('login', err.response.data.errors);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="registration__form" onSubmit={handleSubmit}>
            <div className="registration__form__heading-group">
              <h4 className="registration__form__heading">Sign in</h4>
              <div className="registration__form__subheading">
                Please log into your account
              </div>
            </div>
            <FormErrors errors={formErrors} form="login" />
            <div className="input__group">
              <input
                className="input fluid"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="input__error">
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div className="input__group">
              <input
                className="input fluid"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <div className="input__error">
                {errors.password && touched.password && errors.password}
              </div>
            </div>
            <button
              className="btn btn__submit"
              type="submit"
              disabled={isSubmitting}
            >
              Sign in
            </button>
            <div className="registration__form__footer">
              New? Please follow the link to{' '}
              <Link className="link" to="/register">
                register
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
});
