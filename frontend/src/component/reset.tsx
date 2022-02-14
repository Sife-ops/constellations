import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

export const Reset: React.FC = () => {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async ({ email }, { setSubmitting }) => {
        setSubmitting(true);
      }}
    >
      {({ handleChange, handleSubmit, isSubmitting, values }) => (
        <form onSubmit={handleSubmit}>
          <input name="email" onChange={handleChange} placeholder="email" value={values.email} />
          <br />
          <button disabled={isSubmitting} type="submit">
            submit
          </button>
          <br />
          <Link to="/login">{'Already have an account? Sign In'}</Link>
          <br />
          <Link to="/register">{"Don't have an account? Sign Up"}</Link>
        </form>
      )}
    </Formik>
  );
};
