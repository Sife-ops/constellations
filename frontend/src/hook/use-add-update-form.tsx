import { useState, useEffect } from 'react';
import { useUrl } from './use-url';

export const useAddUpdateForm = (
  i: { description: string; url: string } = {
    description: '',
    url: '',
  }
) => {
  const [description, setDescription] = useState<string>(i.description);
  const { isValid: isValidUrl, setUrl, url } = useUrl(i.url);

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  useEffect(() => {
    if (description.length > 0 && isValidUrl) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [description, isValidUrl, url]);

  useEffect(() => {
    if (isValidUrl) {
      console.log('trying to fetch description');
      setDescription('test');
    }
    // todo: debounce url
  }, [url]);

  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const handleUrl = (e: any) => {
    setUrl(e.target.value);
  };

  return {
    description,
    handleDescription,
    handleUrl,
    isValidForm,
    isValidUrl,
    setDescription,
    setUrl,
    url,
  };
};
