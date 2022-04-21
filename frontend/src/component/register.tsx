import Captcha from 'react-google-recaptcha';
import React from 'react';
import { Box, Button, Input, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { BoxOutlined } from './box-outlined';
import { Link, useNavigate } from 'react-router-dom';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { env } from '../utility/constant';
import { useRegister } from '../hook/use-register';
import { useRegisterMutation } from '../generated/graphql';

export const Register: React.FC = () => {
  const [errorUsername, setErrorUsername] = React.useState<boolean>(false);
  const [errorCaptcha, setErrorCaptcha] = React.useState<boolean>(false);

  const [_, registerMutation] = useRegisterMutation();
  const r = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await registerMutation({
      password: r.password,
      username: r.username,
      captcha: r.captcha,
    });

    if (res.error) {
      console.log(res);

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
          {errorUsername && errorBox('An account with that username already exists.')}
          {errorCaptcha && errorBox('Captcha Failed')}

          <Box className="element">
            <Input
              focusBorderColor={r.username.length < 1 ? '' : !r.isValidUsername ? 'red.500' : 'green.500'}
              name="username"
              onChange={(e) => r.setUsername(e.target.value)}
              placeholder="username"
              value={r.username}
            />
          </Box>
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
