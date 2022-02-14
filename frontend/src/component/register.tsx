import React from 'react';
import _ from 'lodash';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../generated/graphql';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [_, registerMutation] = useRegisterMutation();

  return (
    <Formik
      initialValues={{ email: '', username: '', password: '' }}
      onSubmit={async ({ email, username, password }, { setSubmitting }) => {
        setSubmitting(true);
        const res = await registerMutation({ email, password, username });
        if (res.error) return;
        navigate('login');
      }}
    >
      {({ handleChange, handleSubmit, isSubmitting, values }) => (
        <form onSubmit={handleSubmit}>
          <input
            //
            name="email"
            onChange={handleChange}
            placeholder="email"
            value={values.email}
          />
          <br />
          <input name="username" onChange={handleChange} placeholder="username" value={values.username} />
          <br />
          <input
            name="password"
            onChange={handleChange}
            placeholder="password"
            type="password"
            value={values.password}
          />
          <br />
          <button disabled={isSubmitting} type="submit">
            Sign Up
          </button>
          <br />
          <Link to="/reset">Forgot password?</Link>
          <br />
          <Link to="/login">{'Already have an account? Sign In'}</Link>
        </form>
      )}
    </Formik>
  );
};
