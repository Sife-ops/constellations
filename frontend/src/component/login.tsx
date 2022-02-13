import React from 'react';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../generated/graphql';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [_, loginMutation] = useLoginMutation();

  return (
    <Formik
      initialValues={{ email: '', password: '', remember: false }}
      onSubmit={async ({ email, password, remember }, { setSubmitting }) => {
        setSubmitting(true);
        const res = await loginMutation({
          email,
          password,
          remember,
        });
        if (res.error) {
          return navigate('/reset');
        }
        window.location.reload();
      }}
    >
      {({ handleChange, handleSubmit, isSubmitting, setFieldValue, values }) => (
        <form onSubmit={handleSubmit}>
          <input
            id="at-loginForm__email"
            name="email"
            onChange={handleChange}
            placeholder="email"
            value={values.email}
          />
          <br />
          <input
            id="at-loginForm__password"
            name="password"
            onChange={handleChange}
            placeholder="password"
            type="password"
            value={values.password}
          />
          <br />
          <input
            checked={values.remember}
            id="at-loginForm__remember"
            onChange={() => setFieldValue('remember', !values.remember)}
            type="checkbox"
          />
          <label>Remember me</label>
          <br />
          <button disabled={isSubmitting} id="at-loginForm__submit" type="submit">
            Sign In
          </button>
          <br />
          <Link to="/reset">Forgot password?</Link>
          <br />
          <Link to="/register">{"Don't have an account? Sign Up"}</Link>
        </form>
      )}
    </Formik>
  );
};
