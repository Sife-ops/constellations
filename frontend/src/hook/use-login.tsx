import { useEffect, useState } from 'react';
import { useEmail } from './use-email';
import { usePassword } from './use-password';

export const useLogin = (i: { email: string; password: string; remember: boolean }) => {
  const { email, isValid: isValidEmail, setEmail } = useEmail(i.email);
  const { password, isValid: isValidPassword, setPassword } = usePassword(i.password);
  const [remember, setRemember] = useState<boolean>(i.remember);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (isValidEmail && isValidPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isValidEmail, isValidPassword]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    remember,
    setRemember,
    isValid,
  };
};
