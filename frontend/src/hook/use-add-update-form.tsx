import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { usePageTitleMutation } from '../generated/graphql';
import { useUrl } from './use-url';

export const useAddUpdateForm = (
  i: { description: string; url: string } = {
    description: '',
    url: '',
  }
) => {
  const [description, setDescription] = useState<string>(i.description);
  const { isValid: isValidUrl, setUrl, url } = useUrl(i.url);
  const [debouncedUrl] = useDebounce(url, 1000);
  const [_, pageTitleMutation] = usePageTitleMutation();

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
      console.log('fetching page title');
      pageTitleMutation({
        // todo: use url?
        url: debouncedUrl,
      }).then((res) => {
        if (res.error) {
          console.error(`could not fetch page title: ${res.error.graphQLErrors}`);
        } else if (res.data?.pageTitle) {
          setDescription(res.data.pageTitle);
        }
      });
    }
  }, [debouncedUrl]);

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
