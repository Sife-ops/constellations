import React from 'react';
import _ from 'lodash';
import { Box, BoxProps, Button, Input } from '@chakra-ui/react';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../generated/graphql';
import { BoxOutlined } from './box-outlined';

export const Register: React.FC<BoxProps> = (p) => {
  const navigate = useNavigate();

  const [_, registerMutation] = useRegisterMutation();

  return (
    <BoxOutlined className={p.className}>
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
            <Box className="element">
              <Input
                //
                name="email"
                onChange={handleChange}
                placeholder="email"
                value={values.email}
              />
            </Box>
            <Box className="element">
              <Input name="username" onChange={handleChange} placeholder="username" value={values.username} />
            </Box>
            <Box className="element">
              <Input
                name="password"
                onChange={handleChange}
                placeholder="password"
                type="password"
                value={values.password}
              />
            </Box>
            <Box className="element">
              <Button colorScheme='blue' disabled={isSubmitting} type="submit">
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
