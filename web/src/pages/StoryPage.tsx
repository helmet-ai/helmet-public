import SidePane from '../components/SidePane';
import Messenger from '../components/Messenger';
import {
  useToast,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  Text,
  LinkBox,
  Tag,
} from '@chakra-ui/react';
import Color from '../styles/Color';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { gql } from '../__generated__/gql';
import {
  QueryReference,
  useBackgroundQuery,
  useMutation,
  useReadQuery,
} from '@apollo/client';
import Loader from '../components/Loader';
import { GetStoryQuery } from '../__generated__/graphql';
import { useParams } from 'react-router-dom';
import React from 'react';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { getImage } from '../utils';
dayjs.extend(relativeTime);

interface IMessage {
  role: string;
  content: string;
}

const GET_STORY = gql(`#graphql
query GetStory($id: ID!) {
  story(id: $id) {
    id
    title
    body
    storyTopics {
      explanation
      topic {
        id
        title
      }
    }
    citationStories {
      citation {
        title
        url
      }
    }
  }
}
`);

const MESSAGE = gql(`#graphql
mutation Message($messages: [MessageInput]!) {
  message(messages: $messages) {
    role
    content
  }
}
`);

export default function StoryPage() {
  const { id } = useParams();
  const [queryRef] = useBackgroundQuery(GET_STORY, {
    variables: { id: id ?? '' },
  });
  return (
    <Loader>
      <Content queryRef={queryRef} />
    </Loader>
  );
}

function Content({ queryRef }: { queryRef: QueryReference<GetStoryQuery> }) {
  const [activeThumb, setActiveThumb] = useState<boolean | undefined>(
    undefined
  );
  const toast = useToast();
  const { data } = useReadQuery(queryRef);
  const [hasSent, setHasSent] = useState(false);
  const [messageBot] = useMutation(MESSAGE);
  const [messages, setMessages] = useState<IMessage[]>([
    {
      role: 'system',
      content: `A summary of a news story is provided below. Please answer the following messages relating to the story. "${data.story.body}"`,
    },
  ]);
  const ref = React.useRef<any>(null);

  async function sendMessage(message: string) {
    setHasSent(true);
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    ref.current.scroll();
    const { data } = await messageBot({ variables: { messages: newMessages } });
    const m = [
      ...newMessages,
      { role: data?.message.role, content: data?.message.content },
    ].filter((m) => m != null && m != undefined) as any;
    setMessages(m);
    setHasSent(false);
    ref.current.scroll();
  }

  return (
    <>
      <Box height="100vh" overflowY="auto" position="fixed">
        <Box w="1044px" p="40px">
          <Box h="300px" backgroundColor={Color.accent} borderRadius="24px">
            <Image
              src={getImage(data.story.title)}
              w="1044px"
              h="300px"
              borderRadius="24px"
            />
          </Box>

          <Text mt="16px" textStyle="subtext">
            {dayjs('2023-06-18').fromNow()}
          </Text>
          <Flex justifyContent="space-between">
            <Text textStyle="h1" mb="8px">
              {data.story.title}
            </Text>
            <Box minWidth="110px">
              <Button
                mr="8px"
                onClick={() => {
                  if (activeThumb === undefined || activeThumb === false) {
                    toast({
                      title: 'Got your thumbs up!',
                      description:
                        'Thanks for providing feedback to help make our data more accurate.',
                      status: 'success',
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                  activeThumb
                    ? setActiveThumb(undefined)
                    : setActiveThumb(true);
                }}
              >
                <FiThumbsUp
                  color={activeThumb === true ? Color.green : Color.text}
                />
              </Button>
              <Button
                onClick={() => {
                  if (activeThumb === undefined || activeThumb === true) {
                    toast({
                      title: 'Got your thumbs down!',
                      description:
                        'Thanks for providing feedback to help make our data more accurate.',
                      status: 'warning',
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                  activeThumb === false
                    ? setActiveThumb(undefined)
                    : setActiveThumb(false);
                }}
              >
                <FiThumbsDown
                  color={activeThumb === false ? Color.red : Color.text}
                />
              </Button>
            </Box>
          </Flex>
          {/* Tags */}
          <Box mb="8px">
            <Flex alignItems="center">
              <Text textStyle="subtext" mr="4px">
                Topics:
              </Text>
              {data.story?.storyTopics.map(({ topic }) => (
                <LinkBox as={Link} key={topic.id} mr="4px">
                  <Tag>{topic.title}</Tag>
                </LinkBox>
              ))}
            </Flex>
          </Box>
          {data.story.body.split('\n').map((p, i) => (
            <Text textStyle="p" mb="8px" key={p + i.toString()}>
              {p}
            </Text>
          ))}
          {data.story.storyTopics.length > 0 && (
            <>
              <Text textStyle="h2" mt="24px">
                Topic Explanations
              </Text>
              {data.story.storyTopics.map((storyTopics) => (
                <Box
                  mt={8}
                  w="400px"
                  bg="purple.500"
                  boxShadow="xl"
                  p={8}
                  borderRadius="md"
                >
                  <Flex align="center" mb={8}>
                    <Text
                      as="span"
                      fontSize="3xl"
                      fontWeight="bold"
                      color="white"
                      textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
                      mr={2}
                    >
                      <span style={{ color: '#FF69B4', fontWeight: 'bold' }}>
                        ✨
                      </span>
                    </Text>
                    <Text as="h2" fontWeight="bold" color="white">
                      {storyTopics.explanation}
                    </Text>
                  </Flex>

                  <Text as="p" fontWeight="bold" color="white">
                    For {storyTopics.topic.title}
                  </Text>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>

      <SidePane>
        <Box>
          {/* <Text textStyle="h2" mb="8px">
            Threads
          </Text>
          <Box overflowY="auto" height="16vh">
            <Message name="Email" message="This is a test email" />
            <Message name="Email" message="This is also a test email" />
          </Box>

          <Divider mt="16px" mb="16px" />
 */}

          <Text textStyle="h2" mb="8px">
            Citations
          </Text>
          <Box overflowY="auto" h="10vh">
            {data.story.citationStories.map(({ citation }) => (
              <Text textStyle="link">
                <Link isExternal textStyle="link" href={citation.url}>
                  {citation.title}
                </Link>
              </Text>
            ))}
          </Box>
        </Box>
        <Divider mt="16px" mb="16px" />
        <Messenger
          ref={ref}
          height="78vh"
          hasSent={hasSent}
          isStory={true}
          messages={messages.filter((m) => m.role !== 'system')}
          onMessage={(msg) => {
            sendMessage(msg);
          }}
        />
      </SidePane>
    </>
  );
}
