import { Box, Text } from '@chakra-ui/react';
import Color from '../styles/Color';

export default function Button({
  active,
  label,
  onClick,
  loading,
  disabled,
}: {
  loading?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
  active?: boolean | null | undefined;
  label: string;
  onClick?: () => void | null | undefined;
}) {
  return (
    <Box
      disabled={disabled == true || loading == true}
      as="button"
      w="100%"
      borderRadius="8px"
      backgroundColor={
        disabled == false && loading == false && active
          ? Color.accent
          : Color.accent100
      }
      justifyContent="center"
      alignItems="center"
      p="16px"
      onClick={onClick}
    >
      <Text
        textAlign="center"
        textStyle="bold"
        color={
          disabled == false && loading == false && active
            ? Color.accent100
            : Color.accent
        }
      >
        {loading == true ? 'Loading...' : label}
      </Text>
    </Box>
  );
}
