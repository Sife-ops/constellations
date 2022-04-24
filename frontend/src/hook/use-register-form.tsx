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
  const { dUsernameCtl, isValidUsername, setUsername, userExistsRes, username } = useUsername(i.username);
  const { password, isValidPassword, setPassword } = usePassword(i.password);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [captcha, setCaptcha] = useState<string | null>(null);
  const [isValidRegister, setIsValidRegister] = useState<boolean>(false);

  useEffect(() => {
    if (env.secret.recaptcha && !captcha) {
      // only check captcha if it is enabled
      setIsValidRegister(false);
    } else if (
      isValidUsername &&
      !dUsernameCtl.isPending() &&
      !userExistsRes.fetching &&
      userExistsRes.data?.userExists === false &&
      isValidPassword &&
      passwordConfirm === password
    ) {
      setIsValidRegister(true);
    } else {
      setIsValidRegister(false);
    }
  }, [
    //
    username,
    userExistsRes.fetching,
    password,
    passwordConfirm,
    captcha,
  ]);

  return {
    captcha,
    dUsernameCtl,
    isValidPassword,
    isValidRegister,
    isValidUsername,
    password,
    passwordConfirm,
    setCaptcha,
    setPassword,
    setPasswordConfirm,
    setUsername,
    userExistsRes,
    username,
  };
};
