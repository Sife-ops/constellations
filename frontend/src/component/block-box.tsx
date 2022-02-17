import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export const BlockBox: React.FC<BoxProps> = (p) => {
  return (
    <Box borderRadius="lg" borderWidth="1px" {...p}>
      {p.children}
    </Box>
  );
};
