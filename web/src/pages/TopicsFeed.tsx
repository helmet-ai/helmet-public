import {
  QueryReference,
  useBackgroundQuery,
  useMutation,
  useReadQuery,
} from '@apollo/client';
import { useState } from 'react';
import Loader from '../components/Loader';
import { Box, Flex, Text } from '@chakra-ui/react';
import SidePane from '../components/SidePane';
import Messenger from '../components/Messenger';
import Story from '../components/Story';
import { GetTopicFeedQuery } from '../__generated__/graphql';
import { gql } from '../__generated__/gql';
import { useParams } from 'react-router-dom';

const GET_TOPIC_FEED = gql(`#graphql
query GetTopicFeed($id: ID!) {
    topic(id: $id) {
      id
      title
      storyTopics {
        story {
            id
            title
            body
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

export default function TopicsFeed() {
  const { id } = useParams();
  console.log({ id });
  const [queryRef] = useBackgroundQuery(GET_TOPIC_FEED, {
    variables: { id: id ?? '' },
  });
  return (
    <Loader>
      <Content queryRef={queryRef} />
    </Loader>
  );
}

const PANE_WIDTH = '470px';

interface Message {
  role: string;
  content: string;
}

function Content({
  queryRef,
}: {
  queryRef: QueryReference<GetTopicFeedQuery>;
}) {
  const { data } = useReadQuery(queryRef);
  const [hasSent, setHasSent] = useState(false);
  const [messageBot] = useMutation(MESSAGE);
  const [messages, setMessages] = useState<Message[]>([]);

  async function startConversation(story: string) {
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
      <Flex>
        <Box width={PANE_WIDTH}>
          <Box
            width={PANE_WIDTH}
            height="100vh"
            overflowY="auto"
            position="fixed"
            p="40px"
          >
            <Text textStyle="h1">{data.topic.title}</Text>
            <Text textStyle="p" mb="16px">
              A list of stories about {data.topic.title}.
            </Text>
            {data.topic.storyTopics.length > 0 ? (
              data.topic.storyTopics.map(({ story }) => (
                <Box mb="24px">
                  <Story
                    to={`/stories/${story?.id}`}
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
          messages={messages}
          onMessage={(msg) => {
            sendMessage(msg);
          }}
        />
      </SidePane>
    </>
  );
}
