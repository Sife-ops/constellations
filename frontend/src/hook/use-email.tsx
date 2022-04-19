import * as yup from 'yup';
import { useState, useEffect } from 'react';

export const useEmail = (initialValue: string) => {
  const [email, setEmail] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const emailSchema = yup.object().shape({
    email: yup.string().email().required(),
  });

  useEffect(() => {
    if (email.length < 1) {
      setIsValid(false);
      return;
    }

    const isValid = emailSchema.isValidSync({ email });
    setIsValid(isValid);
  }, [email]);

  return { email, setEmail, isValid };
};
