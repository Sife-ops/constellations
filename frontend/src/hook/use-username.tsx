import * as yup from 'yup';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { useUserExistsMutation } from '../generated/graphql';

export const useUsername = (initialValue: string) => {
  const [username, setUsername] = useState<string>(initialValue);
  const [isValidUsername, setIsValidUsername] = useState<boolean>(false);
  const [dUsername, dUsernameCtl] = useDebounce(username, 1000);
  const [userExistsRes, userExistsMutation] = useUserExistsMutation();

  const usernameSchema = yup.object().shape({
    username: yup.string().min(5).required(),
  });

  useEffect(() => {
    const isValidUsername = usernameSchema.isValidSync({ username });
    setIsValidUsername(isValidUsername);
  }, [username]);

  useEffect(() => {
    if (isValidUsername) {
      userExistsMutation({
        username: dUsername,
      });
    }
  }, [dUsername]);

  return {
    dUsernameCtl,
    isValidUsername,
    setUsername,
    userExistsRes,
    username,
  };
};
