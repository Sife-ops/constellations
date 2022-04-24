import { Box, Text } from '@chakra-ui/react';
import { BoxOutlined } from '../box-outlined';
import { WarningTwoIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';

export const InputFeedback: React.FC<{
  className?: string | undefined;
  msg: string;
  type: 'success' | 'failure' | 'warning';
}> = (p) => {
  const bgColor = () => {
    switch (p.type) {
      case 'failure':
        return 'red.500';
      case 'success':
        return 'green.500';
      case 'warning':
        return 'yellow.500';
    }
  };

  const icon = () => {
    switch (p.type) {
      case 'failure':
        return <NotAllowedIcon />;
      case 'success':
        return <CheckCircleIcon />;
      case 'warning':
        return <WarningTwoIcon />;
    }
  };

  return (
    <BoxOutlined bg={bgColor()} className={p.className}>
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
          {icon()}
        </Box>
        <Text>{p.msg}</Text>
      </Box>
    </BoxOutlined>
  );
};
