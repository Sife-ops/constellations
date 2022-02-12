import React from 'react';
import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom';

import {
  useRegisterMutation,
  useUserExistsMutation,
} from '../generated/graphql';

import {
  emailIsValid,
  passwordIsValid,
  usernameIsValid,
} from '../utility/function';

// todo: use union type
enum Tristate {
  true = 'true',
  false = 'false',
  default = 'default',
}

type UserExistsVariable = 'email' | 'username';

type InputError = [boolean, string];

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [userExistsResult, userExistsMutation] = useUserExistsMutation();
  const [registerResult, registerMutation] = useRegisterMutation();

  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // todo: change to emailAvailable?
  const [emailExists, setEmailExists] = React.useState<Tristate>(
    Tristate.default
  );
  const [usernameExists, setUsernameExists] = React.useState<Tristate>(
    Tristate.default
  );

  const [registerSuccess, setRegisterSuccess] = React.useState<boolean>(false);

  const debounceInputCb = (
    variable: UserExistsVariable,
    setInputExists: React.Dispatch<React.SetStateAction<Tristate>>
  ) => {
    return async (nextValue: string) => {
      const res = await userExistsMutation({ [variable]: nextValue });
      if (res.data?.userExists) {
        setInputExists(Tristate.true);
        return;
      }
      setInputExists(Tristate.false);
    };
  };

  const debounceEmail = React.useRef(
    _.debounce(debounceInputCb('email', setEmailExists), 1000)
  ).current;

  const debounceUsername = React.useRef(
    _.debounce(debounceInputCb('username', setUsernameExists), 1000)
  ).current;

  // todo: use event types
  const handleEmail = (e: any) => {
    setEmailExists(Tristate.default);
    setEmail(e.target.value);
    debounceEmail(e.target.value);
  };

  const handleUsername = (e: any) => {
    setUsernameExists(Tristate.default);
    setUsername(e.target.value);
    debounceUsername(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await registerMutation({ email, password, username });
    if (res.error) return;
    setRegisterSuccess(true);
    setTimeout(() => {
      navigate('login');
    }, 2000);
  };

  const emailError = (): InputError => {
    if (email !== '' && !emailIsValid(email)) {
      return [true, 'invalid email'];
    }
    if (emailExists === Tristate.true) {
      return [true, 'already registered'];
    }
    return [false, ''];
  };

  const usernameError = (): InputError => {
    if (username !== '' && !usernameIsValid(username)) {
      return [true, '5-15 characters, letters and number only'];
    }
    if (usernameExists === Tristate.true) {
      return [true, 'username unavailable'];
    }
    return [false, ''];
  };

  const passwordError = (): InputError => {
    if (password !== '' && !passwordIsValid(password)) {
      return [
        true,
        'Use at least 8 characters, one number, and one special character.',
      ];
    }
    return [false, ''];
  };

  const [emailIsError, emailHelperText] = emailError();
  const [usernameIsError, usernameHelperText] = usernameError();
  const [passwordIsError, passwordHelperText] = passwordError();

  const emailColor = () => {
    if (email !== '' && emailExists === Tristate.false) return 'success';
    return 'primary';
  };

  const usernameColor = () => {
    if (username !== '' && usernameExists === Tristate.false) return 'success';
    return 'primary';
  };

  const passwordColor = () => {
    if (password !== '' && passwordIsValid(password)) return 'success';
    return 'primary';
  };

  const registerDisabled = (): boolean => {
    if (emailExists !== Tristate.false || !emailIsValid(email)) {
      return true;
    }
    if (usernameExists !== Tristate.false || !usernameIsValid(username)) {
      return true;
    }
    if (!passwordIsValid(password)) return true;
    return false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        //
        onChange={handleEmail}
        placeholder="email"
        value={email}
      />
      <br />
      <input
        onChange={handleUsername}
        placeholder="username"
        value={username}
      />
      <br />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        value={password}
      />
      <br />
      <button type="submit">submit</button>
      <br />
      <Link to="/reset">Forgot password?</Link>
      <br />
      <Link to="/login">{'Already have an account? Sign In'}</Link>
    </form>
  );
};
