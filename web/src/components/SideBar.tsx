import { FiBook, FiHome } from 'react-icons/fi';
import { Avatar, Box, Flex, Link, Spacer } from '@chakra-ui/react';
import Color from '../styles/Color';
import { IconType } from 'react-icons';
import { Link as RouterLink } from 'react-router-dom';

function SideBarIcon({
  active,
  icon,
  link,
}: {
  active?: boolean | null | undefined;
  icon: IconType;
  link?: string | null | undefined;
}) {
  const Icon = icon;
  return (
    <Box marginBottom="32px">
      <Link as={RouterLink} to={link ?? ''}>
        <Box
          background={active ? Color.accent100 : 'transparent'}
          borderRadius="50%"
          p="8px"
          alignContent="center"
          justifyContent="center"
        >
          <Icon size="24px" color={active ? Color.accent : Color.accentText} />
        </Box>
      </Link>
    </Box>
  );
}

export default function SideBar({ active }: { active: string }) {
  return (
    <Box
      minH="100vh"
      pos="fixed"
      p="32px"
      backgroundColor={Color.accent}
      left="0"
    >
      <Flex direction="column" minH="100vh" pt="40px" pb="80px">
        <Box>
          <SideBarIcon active={active === 'Home'} icon={FiHome} link="/" />
          <SideBarIcon
            active={active === 'Topics'}
            icon={FiBook}
            link="/topics"
          />
        </Box>
        <Spacer />
        <Box>
          <Avatar name="Name" boxSize="40px" />
        </Box>
      </Flex>
    </Box>
  );
}
