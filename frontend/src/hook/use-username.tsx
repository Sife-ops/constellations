import * as yup from 'yup';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { useUserExistsMutation } from '../generated/graphql';

export const useUsername = (initialValue: string) => {
  const [username, setUsername] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  const [debouncedUsername] = useDebounce(username, 1000);
  const [exists, setExists] = useState<boolean | 'pending'>('pending');
  const [_, userExistsMutation] = useUserExistsMutation();

  const usernameSchema = yup.object().shape({
    username: yup.string().min(5).required(),
  });

  useEffect(() => {
    setExists('pending');
    const isValid = usernameSchema.isValidSync({ username });
    setIsValid(isValid);
  }, [username]);

  useEffect(() => {
    if (isValid) {
      userExistsMutation({
        username: debouncedUsername,
      }).then((res) => {
        if (res.error) {
          console.error(res);
        } else if (res.data) {
          if (res.data.userExists) {
            setExists(true);
          } else {
            setExists(false);
          }
        }
      });
    }
  }, [debouncedUsername]);

  return { username, setUsername, isValid, exists };
};
