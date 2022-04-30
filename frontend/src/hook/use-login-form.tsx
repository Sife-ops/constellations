import { useEffect, useState } from 'react';
import { useUsername } from './use-username';
import { usePassword } from './use-password';

export const useLoginForm = (
  i: { username: string; password: string; remember: boolean } = {
    username: '',
    password: '',
    remember: false,
  }
) => {
  const { username, isValidUsername, setUsername } = useUsername(i.username);
  const { password, isValidPassword, setPassword } = usePassword(i.password);
  const [remember, setRemember] = useState<boolean>(i.remember);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (isValidUsername && isValidPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isValidUsername, isValidPassword]);

  return {
    username,
    setUsername,
    password,
    setPassword,
    remember,
    setRemember,
    isValid,
  };
};
