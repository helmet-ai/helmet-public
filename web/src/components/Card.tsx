import {  Box, LinkBox, Text } from '@chakra-ui/react';
import Color from '../styles/Color';
import Button from './Button';
import { Link } from 'react-router-dom';

export default function Card({
  link,
  title,
  subtext,
}: {
  link: string;
  title: string;
  subtext: string;
  items?: { name: string }[] | undefined | null;
}) {
  return (
    <Box
      p="24px"
      w="380px"
      borderRadius="24px"
      background={Color.cardBackground}
      boxShadow="2px 2px 16px rgba(0, 0, 0, 0.04)"
    >
      <Text textStyle="h1" noOfLines={1}>
        {title}
      </Text>
      <Text textStyle="subtext" noOfLines={2} mb="8px">
        {subtext}
      </Text>
      <LinkBox as={Link} to={link}>
        <Button active label="View stories" />
      </LinkBox>
      <Box mb="8px" />
      <Button active label="Edit" />
    </Box>
  );
}
