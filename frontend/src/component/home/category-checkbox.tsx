import { useCheckbox, chakra, Flex, Box, Text, UseCheckboxProps } from '@chakra-ui/react';

export const CategoryCheckbox: React.FC<UseCheckboxProps> = (p) => {
  const CustomCheckbox = () => {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(p);

    return (
      <chakra.label
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridColumnGap={2}
        maxW="36"
        bg="green.50"
        border="1px solid"
        borderColor="green.500"
        rounded="lg"
        px={3}
        py={1}
        cursor="pointer"
        {...htmlProps}
      >
        <input {...getInputProps()} hidden />
        <Flex
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="green.500"
          w={4}
          h={4}
          {...getCheckboxProps()}
        >
          {state.isChecked && <Box w={2} h={2} bg="green.500" />}
        </Flex>
        <Text {...getLabelProps()}>{p.children}</Text>
      </chakra.label>
    );
  };

  return (
    <div>
      <CustomCheckbox />
    </div>
  );
};
