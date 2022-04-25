import { Box, Text } from '@chakra-ui/react';
import { BoxOutlined } from '../box-outlined';
import { WarningTwoIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';

export const InputFeedback: React.FC<{
  className?: string | undefined;
  msg: string;
  type: 'success' | 'failure' | 'warning';
}> = (p) => {
  const variant = () => {
    switch (p.type) {
      case 'failure':
        return { color: 'red.500', icon: <NotAllowedIcon /> };
      case 'success':
        return { color: 'green.500', icon: <CheckCircleIcon /> };
      case 'warning':
        return { color: 'yellow.500', icon: <WarningTwoIcon /> };
    }
  };

  return (
    <BoxOutlined bg={variant().color} className={p.className}>
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
          {variant().icon}
        </Box>
        <Text>{p.msg}</Text>
      </Box>
    </BoxOutlined>
  );
};
