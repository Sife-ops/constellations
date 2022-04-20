import * as yup from 'yup';
import { useState, useEffect } from 'react';

export const useUsername = (initialValue: string) => {
  const [username, setUsername] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const usernameSchema = yup.object().shape({
    username: yup.string().min(8).required(),
  });

  useEffect(() => {
    // if (username.length < 1) {
    //   setIsValid(false);
    //   return;
    // }

    const isValid = usernameSchema.isValidSync({ username });
    setIsValid(isValid);
  }, [username]);

  return { username, setUsername, isValid };
};

