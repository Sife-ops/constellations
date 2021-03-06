import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { usePageTitleMutation } from '../generated/graphql';
import { useUrl } from './use-url';

export const useAddUpdateForm = (i: { description: string; url: string }) => {
  const [description, setDescription] = useState<string>(i.description);
  const { isValidUrl, setUrl, url } = useUrl(i.url);
  const [debouncedUrl] = useDebounce(url, 1000);
  const [pageTitleRes, pageTitleMutation] = usePageTitleMutation();

  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  useEffect(() => {
    if (description.length > 0 && isValidUrl) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [description, isValidUrl, url]);

  useEffect(() => {
    if (description.length < 1 && isValidUrl) {
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

  const urlBorderColor = () => {
    if (url.length < 1) {
      return '';
    } else if (!isValidUrl) {
      return 'red.500';
    } else {
      return '';
    }
  };

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
    pageTitleRes,
    setDescription,
    setUrl,
    url,
    urlBorderColor,
  };
};
