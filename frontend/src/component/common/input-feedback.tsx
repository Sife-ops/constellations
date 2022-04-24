import * as CSS from 'csstype';
import { Box, Text } from '@chakra-ui/react';
import { BoxOutlined } from '../box-outlined';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { Token } from '@chakra-ui/styled-system/dist/declarations/src/utils/types';

// todo: separate component file
export const InputFeedback: React.FC<{
  bg?: Token<CSS.Property.Color, 'colors'>;
  className?: string | undefined;
  msg: string;
}> = (p) => {
  return (
    <BoxOutlined bg={p.bg} className={p.className}>
      <Box
        className="element"
        style={{
          display: 'flex',
        }}
      >
        <Box
          style={{
            marginRight: '.5rem',
          }}
        >
          {/* todo: can change icon */}
          <WarningTwoIcon />
        </Box>
        <Text>{p.msg}</Text>
      </Box>
    </BoxOutlined>
  );
};
