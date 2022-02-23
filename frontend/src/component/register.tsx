import React from 'react';
import _ from 'lodash';
import { Box, BoxProps, Button, Input } from '@chakra-ui/react';
import { BoxOutlined } from './box-outlined';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { emailIsValid, passwordIsValid, usernameIsValid } from '../utility/function';
import { useRegisterMutation } from '../generated/graphql';

export const Register: React.FC<BoxProps> = (p) => {
  const navigate = useNavigate();

  const [_, registerMutation] = useRegisterMutation();

  const [registerError, setRegisterError] = React.useState<null | 'email' | 'username'>(null);

  return (
    <BoxOutlined className={p.className}>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async ({ email, username, password }, { setSubmitting }) => {
          setRegisterError(null);
          setSubmitting(true);
          const res = await registerMutation({ email, password, username });
          if (res.error) {
            const { message } = res.error;
            if (message === '[GraphQL] email') setRegisterError('email');
            if (message === '[GraphQL] username') setRegisterError('username');
            return;
          }
          navigate('login');
        }}
        validate={(values) => {
          const errors: {
            email?: 'empty' | 'invalid';
            username?: 'empty' | 'invalid';
            password?: 'empty' | 'invalid';
          } = {};
          if (!emailIsValid(values.email)) errors.email = 'invalid';
          if (!values.email) errors.email = 'empty';
          if (!passwordIsValid(values.password)) errors.password = 'invalid';
          if (!values.password) errors.password = 'empty';
          if (!usernameIsValid(values.username)) errors.username = 'invalid';
          if (!values.username) errors.username = 'empty';
          return errors;
        }}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
          <form onSubmit={handleSubmit}>
            {registerError && (
              <BoxOutlined bg="tomato" className="block">
                <Box
                  className="element"
                  style={{
                    display: 'flex',
                  }}
                >
                  <Box
                    style={{
                      marginRight: '.5rem',
                    }}
                  >
                    <WarningTwoIcon />
                  </Box>
                  <p>An account with that {registerError === 'email' ? 'email address' : 'username'} already exists.</p>
                </Box>
              </BoxOutlined>
            )}
            <Box className="element">
              <Input
                focusBorderColor={values.email === '' ? '' : errors.email === 'invalid' ? 'red.500' : 'green.500'}
                name="email"
                onChange={handleChange}
                placeholder="email"
                value={values.email}
              />
            </Box>
            <Box className="element">
              <Input
                focusBorderColor={values.username === '' ? '' : errors.username === 'invalid' ? 'red.500' : 'green.500'}
                name="username"
                onChange={handleChange}
                placeholder="username"
                value={values.username}
              />
            </Box>
            <Box className="element">
              <Input
                focusBorderColor={values.password === '' ? '' : errors.password === 'invalid' ? 'red.500' : 'green.500'}
                name="password"
                onChange={handleChange}
                placeholder="password"
                type="password"
                value={values.password}
              />
            </Box>
            <Box className="element">
              <Button colorScheme="blue" disabled={isSubmitting} type="submit">
                Sign Up
              </Button>
            </Box>
            <Box className="element">
              <Link to="/reset">Forgot password?</Link>
            </Box>
            <Box className="element">
              <Link to="/login">{'Already have an account? Sign In'}</Link>
            </Box>
          </form>
        )}
      </Formik>
    </BoxOutlined>
  );
};
