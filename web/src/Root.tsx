import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

export default function Root() {
  return (
    <>
      <Box pl="122px">
        <Outlet />
      </Box>
    </>
  );
}
