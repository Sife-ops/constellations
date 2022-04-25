import { useState, useEffect } from 'react';
import { ex } from '../utility/constant';

export const useUrl = (initialValue: string = '') => {
  const [url, setUrl] = useState<string>(initialValue);
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);

  useEffect(() => {
    if (ex.url.test(url)) {
      setIsValidUrl(true);
    } else {
      setIsValidUrl(false);
    }
  }, [url]);

  return { url, setUrl, isValidUrl };
};
