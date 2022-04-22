import { env } from '../utility/constant';
import { useEffect, useState } from 'react';
import { usePassword } from './use-password';
import { useUsername } from './use-username';

export const useRegisterForm = (
  i: { username: string; password: string; remember: boolean } = {
    username: '',
    password: '',
    remember: false,
  }
) => {
  const { exists: usernameExists, isValid: isValidUsername, setUsername, username } = useUsername(i.username);
  const { password, isValid: isValidPassword, setPassword } = usePassword(i.password);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [isValidRegister, setIsValidRegister] = useState<boolean>(false);

  useEffect(() => {
    if (env.secret.recaptcha && !captcha) {
      setIsValidRegister(false);
    } else if (isValidUsername && isValidPassword && passwordConfirm === password && usernameExists === false) {
      setIsValidRegister(true);
    } else {
      setIsValidRegister(false);
    }
  }, [username, password, passwordConfirm, usernameExists, captcha]);

  return {
    username,
    setUsername,
    isValidUsername,
    usernameExists,
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
