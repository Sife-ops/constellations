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
  const navigate = useNavigate();

  const [_, registerMutation] = useRegisterMutation();

  const [registerError, setRegisterError] = React.useState<null | 'captcha' | 'username'>(null);

  const r = useRegister();
  const handleSubmit = async () => {
    const res = await registerMutation({
      password: r.password,
      username: r.username,
      captcha: r.captcha,
    });

    if (res.error) {
      console.log(res.error);
      const { message } = res.error;
      // todo: use better error???
      if (message === '[GraphQL] failed captcha') setRegisterError('captcha');
      if (message === '[GraphQL] username exists') setRegisterError('username');
    } else {
      // navigate('login');
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
                {registerError === 'captcha' ? (
                  <Text>Failed captcha.</Text>
                ) : (
                  <Text>
                    {/* An account with that {registerError === 'email' ? 'email address' : 'username'} already exists. */}
                    An account with that username already exists.
                  </Text>
                )}
              </Box>
            </BoxOutlined>
          )}
          {/* <Box className="element">
                <Input
                  focusBorderColor={values.email === '' ? '' : errors.email === 'invalid' ? 'red.500' : 'green.500'}
                  name="email"
                  onChange={handleChange}
                  placeholder="email"
                  value={values.email}
                />
              </Box> */}
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
            <Button
              colorScheme="blue"
              // disabled={isSubmitting}
              type="submit"
            >
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
