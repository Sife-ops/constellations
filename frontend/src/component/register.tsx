import Captcha from 'react-google-recaptcha';
import React from 'react';
import { Box, Button, Input, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { BoxOutlined } from './box-outlined';
import { Formik, FormikConfig } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { emailIsValid, passwordIsValid, usernameIsValid } from '../utility/function';
import { env } from '../utility/constant';
import { useRegisterMutation } from '../generated/graphql';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [_, registerMutation] = useRegisterMutation();

  const [registerError, setRegisterError] = React.useState<null | 'email' | 'username'>(null);

  interface Config {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
    captcha: string | null;
  }

  const formikConfig: FormikConfig<Config> = {
    initialValues: { email: '', username: '', password: '', passwordConfirm: '', captcha: null },
    onSubmit: async ({ captcha, email, username, password }, { setSubmitting }) => {
      setRegisterError(null);
      setSubmitting(true);
      const res = await registerMutation({ captcha, email, password, username });
      if (res.error) {
        const { message } = res.error;
        if (message === '[GraphQL] email') setRegisterError('email');
        if (message === '[GraphQL] username') setRegisterError('username');
        return;
      }
      navigate('login');
    },
    validate: (v) => {
      const errors: {
        email?: 'empty' | 'invalid';
        username?: 'empty' | 'invalid';
        password?: 'empty' | 'invalid';
        passwordConfirm?: 'empty' | 'invalid';
        captcha?: 'invalid';
      } = {};
      if (!emailIsValid(v.email)) errors.email = 'invalid';
      if (!v.email) errors.email = 'empty';
      if (!usernameIsValid(v.username)) errors.username = 'invalid';
      if (!v.username) errors.username = 'empty';
      if (!passwordIsValid(v.password)) errors.password = 'invalid';
      if (!v.password) errors.password = 'empty';
      if (v.password !== v.passwordConfirm) errors.passwordConfirm = 'invalid';
      if (!v.passwordConfirm) errors.passwordConfirm = 'empty';
      if (!v.captcha) errors.captcha = 'invalid';
      return errors;
    },
  };

  return (
    <Box
      className="loginRegister"
      style={{
        flexDirection: 'row-reverse',
      }}
    >
      <BoxOutlined
        className="block"
        style={{
          flex: '1',
        }}
      >
        <UnorderedList>
          <ListItem>
            <Text>Username between 5-15 characters.</Text>
          </ListItem>
          <ListItem>
            <Text>Password with:</Text>
            <UnorderedList>
              <ListItem>
                <Text>at least 8 characters</Text>
              </ListItem>
              <ListItem>
                <Text>at least 1 number</Text>
              </ListItem>
              <ListItem>
                <Text>at least 1 special character</Text>
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </BoxOutlined>
      <BoxOutlined
        className="block"
        style={{
          flex: '1',
        }}
      >
        <Formik {...formikConfig}>
          {({ errors, handleChange, handleSubmit, isSubmitting, setFieldValue, values }) => (
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
                    <p>
                      An account with that {registerError === 'email' ? 'email address' : 'username'} already exists.
                    </p>
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
                  focusBorderColor={
                    values.username === '' ? '' : errors.username === 'invalid' ? 'red.500' : 'green.500'
                  }
                  name="username"
                  onChange={handleChange}
                  placeholder="username"
                  value={values.username}
                />
              </Box>
              <Box className="element">
                <Input
                  focusBorderColor={
                    values.password === '' ? '' : errors.password === 'invalid' ? 'red.500' : 'green.500'
                  }
                  name="password"
                  onChange={handleChange}
                  placeholder="password"
                  type="password"
                  value={values.password}
                />
              </Box>
              <Box className="element">
                <Input
                  focusBorderColor={
                    values.passwordConfirm === '' ? '' : errors.passwordConfirm === 'invalid' ? 'red.500' : 'green.500'
                  }
                  name="passwordConfirm"
                  onChange={handleChange}
                  placeholder="confirm password"
                  type="password"
                  value={values.passwordConfirm}
                />
              </Box>
              {env.recaptcha_key.length > 0 && (
                <Box className="element">
                  <Captcha sitekey={env.recaptcha_key} onChange={(v) => setFieldValue('captcha', v)} />
                </Box>
              )}
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
    </Box>
  );
};
