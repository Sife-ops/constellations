import * as yup from 'yup';
import { useState, useEffect } from 'react';

export const usePassword = (initialValue: string) => {
  const [password, setPassword] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const passwordSchema = yup.object().shape({
    password: yup.string()
    .required()
    .min(8)
    .matches(/[0-9]/)
    .matches(/[!@#\$%\^\&*\)\(+=._-]/)
  });

  useEffect(() => {
    // if (password.length < 1) {
    //   setIsValid(false);
    //   return;
    // }

    const isValid = passwordSchema.isValidSync({ password });
    setIsValid(isValid);
  }, [password]);

  return { password, setPassword, isValid };
};
