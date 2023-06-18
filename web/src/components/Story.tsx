import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import { BsRobot } from 'react-icons/bs';
import { Link as RouterLink } from 'react-router-dom';
import Color from '../styles/Color';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getImage } from '../utils';
dayjs.extend(relativeTime);

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Box justifyContent="center" mr="16px">
      <Text textStyle="bold" textAlign="center">
        {value}
      </Text>
      <Text textStyle="subtext" textAlign="center">
        {label}
      </Text>
    </Box>
  );
}

export default function Story({
  image,
  title,
  body,
  onMagic,
  createdAt,
  attachments,
  to,
}: {
  image?: string | null | undefined;
  title: string;
  body: string;
  createdAt: string;
  onMagic?: () => void | null | undefined;
  to: string;
  attachments?:
    | {
        threads: number;
        citations: number;
      }
    | null
    | undefined;
}) {
  return (
    <Box w="388px">
      <Box h="214px" w="388px" borderRadius="24px" position="relative">
        {
          <Image
            position="absolute"
            backgroundColor={Color.accent}
            borderRadius="24px"
            h="214px"
            w="388px"
            zIndex={-1}
            src={image ?? getImage(title)}
          />
        }
      </Box>
      <Box pl="16px" pr="16px" position="relative">
        <Box
          mt="-72px"
          p="24px"
          borderRadius="24px"
          background={Color.cardBackground}
          boxShadow="2px 2px 16px rgba(0, 0, 0, 0.04)"
        >
          <Text textStyle="subtext">{dayjs(createdAt).fromNow()}</Text>
          <Text textStyle="h1" noOfLines={2}>
            {title}
          </Text>
          <Text textStyle="p" noOfLines={3}>
            {body}
          </Text>
          <Text textStyle="link">
            <Link as={RouterLink} to={to}>
              Read more
            </Link>
          </Text>
          {attachments != null && (
            <Flex justifyContent="space-between" mt="16px">
              <Flex>
                <Stat label="Threads" value={attachments.threads} />
                <Stat label="Citations" value={attachments.citations} />
              </Flex>
            </Flex>
          )}
          <Flex justifyContent="end" mt="16px">
            <Button
              as="button"
              p="24px"
              onClick={(e) => {
                onMagic && onMagic();
                e.stopPropagation();
              }}
            >
              <BsRobot size="32px" />
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
