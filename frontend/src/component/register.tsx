import Captcha from 'react-google-recaptcha';
import React, { useState } from 'react';
import { Box, Button, Input, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { BoxOutlined } from './box-outlined';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { env } from '../utility/constant';
import { useRegisterForm } from '../hook/use-register-form';
import { useRegisterMutation } from '../generated/graphql';

export const Register: React.FC = () => {
  const [errorUsername, setErrorUsername] = useState<boolean>(false);
  const [errorCaptcha, setErrorCaptcha] = useState<boolean>(false);

  const f = useRegisterForm();
  const [__, registerMutation] = useRegisterMutation();

  const navigate = useNavigate();

  // todo: move to hook
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await registerMutation({
      password: f.password,
      username: f.username,
      captcha: f.captcha,
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
    if (f.username.length < 1) {
      return '';
    } else if (!f.isValidUsername) {
      return 'red.500';
    } else if (f.userExistsRes.fetching) {
      return '';
    } else if (f.userExistsRes.data?.userExists === true) {
      return 'red.500';
    } else if (f.userExistsRes.data?.userExists === false) {
      return 'green.500';
    } else {
      return '';
    }
  };

  const usernameFeedback = () => {
    const userExists = f.userExistsRes.data?.userExists;
    if (f.isValidUsername) {
      // todo: don't use fetching?
      if (f.dUsernameCtl.isPending() || f.userExistsRes.fetching) {
        return <Spinner />;
      } else {
        return (
          <Box className="element">
            {userExists === true && <Text color="red.500">Username already exists.</Text>}
            {userExists === false && <Text color="green.500">Username available!</Text>}
          </Box>
        );
      }
    } else {
      return null;
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
              onChange={(e) => f.setUsername(e.target.value)}
              placeholder="username"
              value={f.username}
            />
          </Box>

          {/* feedback */}
          {usernameFeedback()}

          <Box className="element">
            <Input
              focusBorderColor={f.password.length < 1 ? '' : !f.isValidPassword ? 'red.500' : 'green.500'}
              name="password"
              onChange={(e) => f.setPassword(e.target.value)}
              placeholder="password"
              type="password"
              value={f.password}
            />
          </Box>
          <Box className="element">
            <Input
              focusBorderColor={
                f.passwordConfirm === '' ? '' : f.passwordConfirm !== f.password ? 'red.500' : 'green.500'
              }
              name="passwordConfirm"
              onChange={(e) => f.setPasswordConfirm(e.target.value)}
              placeholder="confirm password"
              type="password"
              value={f.passwordConfirm}
            />
          </Box>
          {env.secret.recaptcha && (
            <Box className="element">
              <Captcha
                sitekey={env.secret.recaptcha}
                onChange={(v) => {
                  if (v) f.setCaptcha(v);
                }}
              />
            </Box>
          )}
          <Box className="element">
            <Button colorScheme="blue" disabled={!f.isValidRegister} type="submit">
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

// todo: separate component file
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
