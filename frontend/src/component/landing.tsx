import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { use_Dev0Query } from '../generated/graphql';

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
      </Box>
      <Box className="block">
        <UnorderedList>
          <ListItem>
            <Text as="u">
              <a href="https://github.com/Sife-ops/constellations" target="_blank">
                Github
              </a>
            </Text>
          </ListItem>

          <ListItem>
            CLI Utilities
            <UnorderedList>
              <ListItem>
                <Text as="u">
                  <a href="https://github.com/nemored/equuleus" target="_blank">
                    Equuleus (rust)
                  </a>
                </Text>
              </ListItem>
              <ListItem>
                <Text as="u">
                  <a href="https://github.com/Sife-ops/cepheus" target="_blank">
                    Cepheus (Node.js)
                  </a>
                </Text>
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </Box>
    </>
  );
};
