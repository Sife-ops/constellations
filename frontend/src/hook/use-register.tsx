import { env } from '../utility/constant';
import { useEffect, useState } from 'react';
import { usePassword } from './use-password';
import { useUsername } from './use-username';

export const useRegister = (
  i: { username: string; password: string; remember: boolean } = {
    username: '',
    password: '',
    remember: false,
  }
) => {
  const { username, isValid: isValidUsername, setUsername } = useUsername(i.username);
  const { password, isValid: isValidPassword, setPassword } = usePassword(i.password);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [isValidRegister, setIsValidRegister] = useState<boolean>(false);

  useEffect(() => {
    if (env.secret.recaptcha && !captcha) {
      setIsValidRegister(false);
    } else if (isValidUsername && isValidPassword && passwordConfirm === password) {
      setIsValidRegister(true);
    } else {
      setIsValidRegister(false);
    }
  }, [username, password, passwordConfirm]);

  return {
    username,
    setUsername,
    isValidUsername,
    password,
    setPassword,
    isValidPassword,
    passwordConfirm,
    setPasswordConfirm,
    captcha,
    setCaptcha,
    isValidRegister,
  };
};
