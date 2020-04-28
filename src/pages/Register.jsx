import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { setFormErrors, removeFormErrors } from '../actions/alertActions';
import { register } from '../actions/authActions';
import FormErrors from '../components/FormErrors';

const mapStateToProps = (state) => {
  return { formErrors: state.alerts.formErrors };
};

export const Register = connect(mapStateToProps, {
  setFormErrors,
  removeFormErrors,
  register,
})(function ({ formErrors, register }) {
  return (
    <div className="registration">
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Please enter a password you want to use';
          } else if (values.password.length < 5) {
            errors.password =
              'Please enter a password with at least 5 characters';
          }

          if (!values.name) {
            errors.name = 'Please enter your full name';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          // send to server

          register(values, setSubmitting);
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
              <h4 className="registration__form__heading">Register</h4>
              <div className="registration__form__subheading">
                Create your account
              </div>
            </div>
            <FormErrors errors={formErrors} form="register" />
            <div className="input__group">
              <input
                placeholder="Your full name"
                className="input fluid"
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <div className="input__error">
                {errors.name && touched.name && errors.name}
              </div>
            </div>
            <div className="input__group">
              <input
                placeholder="Your email"
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
                placeholder="Choose your password"
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
              Create Account
            </button>
            <div className="registration__form__footer">
              Already have an account?{' '}
              <Link className="link" to="/login">
                Sign in
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
});
