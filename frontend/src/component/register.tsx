import Captcha from 'react-google-recaptcha';
import React, { useState } from 'react';
import { Box, Button, Input, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { BoxOutlined } from './box-outlined';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { env } from '../utility/constant';
import { useRegister } from '../hook/use-register';
import { useRegisterMutation } from '../generated/graphql';

export const Register: React.FC = () => {
  const [errorUsername, setErrorUsername] = useState<boolean>(false);
  const [errorCaptcha, setErrorCaptcha] = useState<boolean>(false);

  const r = useRegister();
  const [__, registerMutation] = useRegisterMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await registerMutation({
      password: r.password,
      username: r.username,
      captcha: r.captcha,
    });

    if (res.error) {
      console.error(res);

      const graphQLErrors = res.error.graphQLErrors.map((e) => e.toString());

      if (graphQLErrors.includes('username exists')) {
        setErrorUsername(true);
      } else if (graphQLErrors.includes('failed captcha')) {
        setErrorCaptcha(true);
      }
    } else {
      navigate('login');
    }
  };

  const usernameBorderColor = () => {
    if (r.username.length < 1) {
      return '';
    } else if (!r.isValidUsername) {
      return 'red.500';
    } else if (r.usernameExists === 'pending') {
      return '';
    } else if (r.usernameExists === true) {
      return 'red.500';
    } else if (r.usernameExists === false) {
      return 'green.500';
    } else {
      return '';
    }
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
        <form onSubmit={handleSubmit}>
          {errorUsername && errorBox('Username exists.')}
          {errorCaptcha && errorBox('Captcha failed.')}

          <Box className="element">
            <Input
              focusBorderColor={usernameBorderColor()}
              name="username"
              onChange={(e) => r.setUsername(e.target.value)}
              placeholder="username"
              value={r.username}
            />
          </Box>
          {r.isValidUsername && r.usernameExists === 'pending' && <Spinner />}
          {r.isValidUsername && r.usernameExists === true && (
            <Box className="element">
              <Text color="red.500">Username already exists.</Text>
            </Box>
          )}
          {r.isValidUsername && r.usernameExists === false && (
            <Box className="element">
              <Text color="green.500">Username available!</Text>
            </Box>
          )}
          <Box className="element">
            <Input
              focusBorderColor={r.password.length < 1 ? '' : !r.isValidPassword ? 'red.500' : 'green.500'}
              name="password"
              onChange={(e) => r.setPassword(e.target.value)}
              placeholder="password"
              type="password"
              value={r.password}
            />
          </Box>
          <Box className="element">
            <Input
              focusBorderColor={
                r.passwordConfirm === '' ? '' : r.passwordConfirm !== r.password ? 'red.500' : 'green.500'
              }
              name="passwordConfirm"
              onChange={(e) => r.setPasswordConfirm(e.target.value)}
              placeholder="confirm password"
              type="password"
              value={r.passwordConfirm}
            />
          </Box>
          {env.secret.recaptcha && (
            <Box className="element">
              <Captcha
                sitekey={env.secret.recaptcha}
                onChange={(v) => {
                  if (v) r.setCaptcha(v);
                }}
              />
            </Box>
          )}
          <Box className="element">
            <Button colorScheme="blue" disabled={!r.isValidRegister} type="submit">
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
      </BoxOutlined>
    </Box>
  );
};

const errorBox = (msg: string) => {
  return (
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
        <Text>{msg}</Text>
      </Box>
    </BoxOutlined>
  );
};
