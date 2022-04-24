// todo: remove yup?
import * as yup from 'yup';
import { useState, useEffect } from 'react';

export const usePassword = (initialValue: string) => {
  const [password, setPassword] = useState<string>(initialValue);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .required()
      .min(8)
      .matches(/[0-9]/)
      .matches(/[!@#\$%\^\&*\)\(+=._-]/),
  });

  useEffect(() => {
    const isValidPassword = passwordSchema.isValidSync({ password });
    setIsValidPassword(isValidPassword);
  }, [password]);

  return { password, setPassword, isValidPassword };
};
