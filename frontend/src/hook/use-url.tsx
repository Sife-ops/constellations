import { useState, useEffect } from 'react';
import { ex } from '../utility/constant';

export const useUrl = (initialValue: string = '') => {
  const [url, setUrl] = useState<string>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (ex.url.test(url)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [url]);

  return { url, setUrl, isValid };
};
