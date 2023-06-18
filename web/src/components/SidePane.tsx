import React from 'react';
import Color from '../styles/Color';
import { Box } from '@chakra-ui/react';

export default function SidePane({ children }: { children: React.ReactNode }) {
  return (
    <Box
      minH="100vh"
      pos="fixed"
      width="370px"
      borderLeft={`1px solid ${Color.divider}`}
      right="0"
      backgroundColor={Color.cardBackground}
      pl="24px"
      pr="24px"
      pt="40px"
      pb="40px"
    >
      {children}
    </Box>
  );
}
