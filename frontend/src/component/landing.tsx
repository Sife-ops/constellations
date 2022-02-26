import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { use_Dev0Query } from '../generated/graphql';
import Captcha from 'react-google-recaptcha';

export const Landing: React.FC = () => {
  const [devRes, _] = use_Dev0Query();

  if (!devRes.fetching) {
    if (devRes.error) {
      console.log(devRes.error);
    } else {
      console.log(devRes.data);
    }
  }

  return (
    <>
      <Box className="block">
        <Text fontSize="3xl">Bookmark Manager</Text>
        <Text>Never lose your bookmarks.</Text>
        <Captcha
          sitekey=''
          onChange={(v) => console.log(v)}
        />
      </Box>
      <Box className="block">
        <UnorderedList>
          <ListItem>
            <Text as="u">
              <a href="https://github.com/Sife-ops/jwt-auth" target="_blank">
                Github
              </a>
            </Text>
          </ListItem>

          <ListItem>They're just bookmarks</ListItem>
        </UnorderedList>
      </Box>
    </>
  );
};
