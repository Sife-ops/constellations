import React from 'react';
import { Box, BoxProps, Button, Input } from '@chakra-ui/react';
import { BoxOutlined } from './box-outlined';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { emailIsValid } from '../utility/function';
import { useLoginMutation } from '../generated/graphql';

interface Props {
  forceUpdate: () => void;
}

export const Login: React.FC<Props & BoxProps> = (p) => {
  const navigate = useNavigate();

  const [_, loginMutation] = useLoginMutation();

  return (
    <BoxOutlined className={p.className}>
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
          p.forceUpdate();
        }}
        validate={(values) => {
          const errors: { email?: 'empty' | 'invalid' } = {};
          if (!emailIsValid(values.email)) errors.email = 'invalid';
          if (!values.email) errors.email = 'empty';
          return errors;
        }}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting, setFieldValue, values }) => (
          <form onSubmit={handleSubmit}>
            <Box className="element">
              <Input
                focusBorderColor={errors.email === 'invalid' ? 'red.500' : ''}
                id="at-loginForm__email"
                isInvalid={errors.email === 'invalid'}
                name="email"
                onChange={handleChange}
                placeholder="email"
                value={values.email}
              />
            </Box>
            <Box className="element">
              <Input
                id="at-loginForm__password"
                name="password"
                onChange={handleChange}
                placeholder="password"
                type="password"
                value={values.password}
              />
            </Box>
            <Box className="element">
              <input
                checked={values.remember}
                id="at-loginForm__remember"
                onChange={() => setFieldValue('remember', !values.remember)}
                type="checkbox"
              />{' '}
              <label>Remember me</label>
            </Box>
            <Box className="element">
              <Button colorScheme="blue" disabled={isSubmitting} id="at-loginForm__submit" type="submit">
                Sign In
              </Button>
            </Box>
            <Box className="element">
              <Link to="/reset">Forgot password?</Link>
            </Box>
            <Box className="element">
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Box>
          </form>
        )}
      </Formik>
    </BoxOutlined>
  );
};
