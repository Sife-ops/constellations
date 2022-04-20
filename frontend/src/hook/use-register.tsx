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
  const [captcha, setCaptcha] = useState<string>('');
  const [isValidRegister, setIsValidRegister] = useState<boolean>(false);

  useEffect(() => {
    if (isValidUsername && isValidPassword && passwordConfirm === password && captcha.length > 0) {
      setIsValidRegister(true);
    } else {
      setIsValidRegister(false);
    }
  }, [isValidUsername, isValidPassword, captcha]);

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
