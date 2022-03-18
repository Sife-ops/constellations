import React from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { BoxOutlined } from './box-outlined';
import { Formik, FormikConfig } from 'formik';
import { emailIsValid } from '../utility/function';
import { useLoginMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';

// interface Props {
//   forceUpdate: () => void;
// }

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [_, loginMutation] = useLoginMutation();

  interface Config {
    email: string;
    password: string;
    remember: boolean;
  }

  const formikConfig: FormikConfig<Config> = {
    initialValues: { email: '', password: '', remember: false },
    onSubmit: async ({ email, password, remember }, { setSubmitting }) => {
      setSubmitting(true);
      const res = await loginMutation({
        email,
        password,
        remember,
      });
      if (res.error) {
        console.log(res.error); // todo: delete
        return navigate('/reset');
      }
      const accessToken = res.data?.login?.accessToken;
      if (accessToken) {
        localStorage.setItem('yu', accessToken);
        window.location.reload();
      }
      // p.forceUpdate(); // todo: delete
    },
    validate: (values) => {
      const errors: { email?: 'empty' | 'invalid' } = {};
      if (!emailIsValid(values.email)) errors.email = 'invalid';
      if (!values.email) errors.email = 'empty';
      return errors;
    },
  };

  return (
    <Box className="loginRegister">
      <BoxOutlined
        className="block"
        style={{
          flex: '1',
        }}
      >
        <Formik {...formikConfig}>
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
            </form>
          )}
        </Formik>
      </BoxOutlined>
      <BoxOutlined
        className="block"
        style={{
          display: 'flex',
          flex: '1',
          justifyContent: 'center',
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-evenly',
          }}
        >
          <Box
            className="element"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Text>Don't have an account yet?</Text>
            <Button colorScheme="blue" onClick={() => navigate('/register')}>
              Sign Up
            </Button>
          </Box>
          <Box
            className="element"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Text>Can't remember your password?</Text>
            <Button colorScheme="blue" id="at-loginForm__submit" type="submit">
              Forgot Password
            </Button>
          </Box>
        </Box>
      </BoxOutlined>
    </Box>
  );
};
