import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export const BlockBox: React.FC<BoxProps> = (p) => {
  return (
    <Box
      //
      // borderColor='green'
      borderRadius="lg"
      borderWidth="1px"
      className="block"
      {...p}
    >
      {p.children}
    </Box>
  );
};
