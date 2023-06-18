import { Avatar, Box, Flex, Input, Text } from '@chakra-ui/react';
import { useImperativeHandle, useState } from 'react';
import React from 'react';

const roleDisplayNames: { [key: string]: string } = {
  user: 'User',
  assistant: 'Helmet',
};

export function Message({
  image,
  name,
  message,
}: {
  image?: string | undefined | null;
  name: string;
  message: string;
}) {
  return (
    <Flex mb="8px">
      <Avatar
        src={image ?? undefined}
        name={name}
        borderRadius="8px"
        boxSize="36px"
        mr="8px"
      />
      <Box>
        <Text textStyle="bold">{name}</Text>
        <Text textStyle="subtext">{message}</Text>
      </Box>
    </Flex>
  );
}
interface IMessage {
  role: string;
  content: string;
}

const Messenger = React.forwardRef(
  (
    {
      hasSent,
      height,
      messages,
      selectedStoryTitle,
      onMessage,
      isStory,
    }: {
      hasSent: boolean;
      height: string;
      messages: IMessage[];
      selectedStoryTitle?: string | undefined | null;
      onMessage?: (message: string) => void | null | undefined;
      isStory?: boolean;
    },
    ref
  ) => {
    const [msg, setMsg] = useState('');
    const messagesEndRef = React.createRef<HTMLDivElement>();

    function scroll() {
      messagesEndRef.current?.scrollIntoView();
    }

    useImperativeHandle(ref, () => ({
      scroll,
    }));

    return (
      <Box h={height}>
        <Box>
          <Text textStyle="h1" mb="8px">
            Chat
          </Text>
          <Box
            width="100%"
            height="144px"
            bgGradient="linear(to-b, rgba(255, 255, 255, 0.64) 50%, rgba(255, 255, 255, 0) 100%);"
            position="absolute"
          />
        </Box>

        <Flex
          direction="column"
          h={height}
          justifyContent="space-between"
          pb="100px"
        >
          <Flex direction="column" h={height} overflowY="auto">
            {isStory ? (
              <Box mt="auto">
                <Message
                  name={roleDisplayNames['assistant']}
                  message="Welcome to helmet! Ask me any questions!"
                />
              </Box>
            ) : (
              <Box mt="auto">
                <Message
                  name={roleDisplayNames['assistant']}
                  message="Welcome to helmet! Please select a story with the 🤖 icon to ask me any questions!"
                />
              </Box>
            )}
            {selectedStoryTitle != null && (
              <Message
                name={roleDisplayNames['assistant']}
                message={`You selected "${selectedStoryTitle}"`}
              />
            )}

            {messages.map((message, i) => (
              <>
                <Box key={i.toString()}>
                  <Message
                    name={roleDisplayNames[message.role]}
                    message={message.content}
                  />
                </Box>
              </>
            ))}
            {hasSent && (
              <Message
                name={roleDisplayNames['assistant']}
                message="is writing a message..."
              />
            )}
            <Box ref={messagesEndRef} />
          </Flex>
          <Input
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            placeholder="Send a message..."
            _placeholder={{
              fontFamily: `'Poppins', sans-serif`,
              fontSize: 14,
            }}
            onKeyDown={(e) => {
              if (msg != '' && e.key === 'Enter') {
                onMessage && onMessage(msg);
                setMsg('');
              }
            }}
          />
        </Flex>
      </Box>
    );
  }
);

export default Messenger;
