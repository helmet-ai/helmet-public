import { Box, Flex, Select, Tag, Text } from '@chakra-ui/react';
import Story from '../components/Story';
import Messenger from '../components/Messenger';
import SidePane from '../components/SidePane';
import Loader from '../components/Loader';
import { gql } from '../__generated__/gql';
import {
  QueryReference,
  useBackgroundQuery,
  useMutation,
  useReadQuery,
} from '@apollo/client';
import { GetFeedQuery } from '../__generated__/graphql';
import { useState } from 'react';

const PANE_WIDTH = '470px';

const GET_FEED = gql(`#graphql
query GetFeed {
  topics {
    id
    title
  }
  feed {
    summary {
      id
      title
      body
    }
    stories {
      id
      title
      body
      storyTopics {
        topic {
          id
          title
        }
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

export default function HomePage() {
  const [queryRef] = useBackgroundQuery(GET_FEED);
  return (
    <Loader>
      <Content queryRef={queryRef} />
    </Loader>
  );
}

interface Message {
  role: string;
  content: string;
}

function Content({ queryRef }: { queryRef: QueryReference<GetFeedQuery> }) {
  const [hasSent, setHasSent] = useState(false);
  const [messageBot] = useMutation(MESSAGE);
  const [messages, setMessages] = useState<Message[]>([]);
  const { data } = useReadQuery(queryRef);
  const { stories } = data.feed;
  const [selectedId, setSelectedId] = useState<number>(NaN);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const filtered = Number.isNaN(selectedId)
    ? stories
    : stories.filter((story) =>
        story?.storyTopics.find(({ topic }) => selectedId === topic.id)
      );

  async function startConversation(story: string) {
    setTitle(story);
    setMessages([
      {
        role: 'system',
        content: `A summary of a news story is provided below. Please answer the following messages relating to the story. "${story}"`,
      },
    ]);
  }

  async function sendMessage(message: string) {
    setHasSent(true);
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    const { data } = await messageBot({ variables: { messages: newMessages } });
    setMessages(
      [
        ...newMessages,
        { role: data?.message.role, content: data?.message.content },
      ].filter((m) => m != null && m != undefined) as any
    );
    setHasSent(false);
  }

  return (
    <>
      {/* Executive summary */}
      <Flex position="relative">
        {/* Feed */}
        <Box width={PANE_WIDTH}>
          <Box
            width={PANE_WIDTH}
            height="100vh"
            overflowY="auto"
            position="fixed"
            p="40px"
          >
            <Flex justifyContent="space-between">
              <Box>
                <Text textStyle="h1">Feed</Text>
              </Box>
              <Select
                value={selectedId}
                placeholder="Select filter"
                w="200px"
                onChange={(e) => {
                  setSelectedId(parseInt(e.target.value));
                }}
              >
                <option value={undefined}>Display All</option>
                {data.topics.map((topic) => (
                  <option value={topic.id} key={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </Select>
            </Flex>
            <Text textStyle="p" mb="16px">
              Interests you and your working groups are subscribed to.
            </Text>

            {filtered.length > 0 ? (
              filtered.map((story) => (
                <Box mb="24px">
                  <Box mb="8px">
                    <Flex alignItems="center">
                      <Text textStyle="subtext" mr="4px">
                        Topics:
                      </Text>
                      {story?.storyTopics.map(({ topic }) => (
                        <Box
                          as="button"
                          onClick={() => {
                            setSelectedId(topic.id);
                          }}
                          key={topic.id}
                          mr="4px"
                        >
                          <Tag>{topic.title}</Tag>
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                  <Story
                    to={`stories/${story?.id}`}
                    key={story?.id}
                    title={story?.title ?? ''}
                    body={story?.body ?? ''}
                    createdAt="2023-06-18"
                    onMagic={() => {
                      startConversation(story?.body ?? '');
                    }}
                    // attachments={{
                    //   threads: 25,
                    //   citations: 1,
                    // }}
                  />
                </Box>
              ))
            ) : (
              <Text>No stories</Text>
            )}
          </Box>
        </Box>
      </Flex>

      <SidePane>
        <Messenger
          hasSent={hasSent}
          height="96vh"
          isStory={false}
          messages={messages.filter((m) => m.role !== 'system')}
          onMessage={(msg) => {
            sendMessage(msg);
          }}
          selectedStoryTitle={title}
        />
      </SidePane>
    </>
  );
}
