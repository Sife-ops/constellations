import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ListItem, UnorderedList } from '@chakra-ui/react';

export const Landing: React.FC = () => {
  return (
    <>
      <Box className="block">
        <Text fontSize="3xl">Bookmark Manager</Text>
        <Text>Blazingly fast!</Text>
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
