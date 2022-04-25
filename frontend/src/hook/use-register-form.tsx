import { InputFeedback } from '../component/common/input-feedback';
import { Spinner } from '@chakra-ui/react';
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

  const usernameBorderColor = () => {
    if (username.length < 1) {
      return '';
    } else if (!isValidUsername) {
      return 'red.500';
    } else if (dUsernameCtl.isPending() || userExistsRes.fetching) {
      return '';
    } else if (userExistsRes.data?.userExists === true) {
      return 'red.500';
    } else if (userExistsRes.data?.userExists === false) {
      return 'green.500';
    } else {
      return '';
    }
  };

  const usernameFeedback = () => {
    const userExists = userExistsRes.data?.userExists;
    if (isValidUsername) {
      // todo: don't use fetching?
      if (dUsernameCtl.isPending() || userExistsRes.fetching) {
        // todo: progress bar?
        return <Spinner />;
      } else if (userExists === true) {
        return <InputFeedback msg="Username already exists." type="failure" className="block" />;
      } else if (userExists === false) {
        return <InputFeedback msg="Username available!" type="success" className="block" />;
      }
    } else {
      return null;
    }
  };

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
    usernameBorderColor,
    usernameFeedback,
  };
};
