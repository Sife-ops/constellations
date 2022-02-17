import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ListItem, UnorderedList } from '@chakra-ui/react';

export const Landing: React.FC = () => {
  return (
    <>
      <Box className="block">
        <Text fontSize="3xl">Bookmark Manager</Text>
      </Box>
      <Box className="block">
        <UnorderedList>
          <ListItem>Relational Data Model</ListItem>

          <ListItem>
            <Text as="u">
              <a href="https://github.com/Sife-ops/jwt-auth" target="_blank">
                Github
              </a>
            </Text>
          </ListItem>

          <ListItem>Coming up:
            <UnorderedList>
              <ListItem>
                Financial Data?
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </Box>
    </>
  );
};
