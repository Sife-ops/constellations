import React from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { BoxOutlined } from './box-outlined';
import { useLoginForm } from '../hook/use-login-form';
import { useLoginMutation } from '../generated/graphql';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  /*
   * fields
   */
  const f = useLoginForm();

  /*
   * submit
   */
  const [_, loginMutation] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await loginMutation({
      username: f.username,
      password: f.password,
      remember: f.remember,
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
  };

  return (
    <Box className="loginRegister">
      <BoxOutlined
        className="block"
        style={{
          flex: '1',
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* <Box className="element">
          <Input
          focusBorderColor={errors.email === 'invalid' ? 'red.500' : ''}
          id="at-loginForm__email"
          isInvalid={errors.email === 'invalid'}
          name="email"
          onChange={handleChange}
          placeholder="email"
          value={values.email}
          />
          </Box> */}
          <Box className="element">
            <Input
              id="at-loginForm__username"
              name="username"
              onChange={(e) => f.setUsername(e.target.value)}
              placeholder="username"
              value={f.username}
            />
          </Box>
          <Box className="element">
            <Input
              id="at-loginForm__password"
              name="password"
              onChange={(e) => f.setPassword(e.target.value)}
              placeholder="password"
              type="password"
              value={f.password}
            />
          </Box>
          <Box className="element">
            <input
              checked={f.remember}
              id="at-loginForm__remember"
              onChange={(e) => f.setRemember(e.target.checked)}
              type="checkbox"
            />{' '}
            <label>Remember me</label>
          </Box>
          <Box className="element">
            <Button colorScheme="blue" disabled={!f.isValidLogin} id="at-loginForm__submit" type="submit">
              Sign In
            </Button>
          </Box>
        </form>
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
