import {
  Box,
  Divider,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Card from '../components/Card';
import { gql } from '../__generated__/gql';
import {
  QueryReference,
  useBackgroundQuery,
  useMutation,
  useReadQuery,
} from '@apollo/client';
import Loader from '../components/Loader';
import { GetTopicsQuery } from '../__generated__/graphql';
import Button from '../components/Button';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import uploadFileToBlob from '../upload';

const fileTypes = ['PDF'];

const GET_TOPICS = gql(`#graphql
query GetTopics {
  topics {
    id
    title
    prompt
  }
}
`);

const CREATE_TOPIC = gql(`#graphql
mutation CreateTopic($input: TopicInput!) {
  createTopic(input: $input) {
    id
    title
    prompt
  }
}
`);

export default function TopicsPage() {
  const [queryRef] = useBackgroundQuery(GET_TOPICS);
  return (
    <Loader>
      <Content queryRef={queryRef} />
    </Loader>
  );
}

function Content({ queryRef }: { queryRef: QueryReference<GetTopicsQuery> }) {
  const [file, setFile] = useState<string>('');
  const { data } = useReadQuery(queryRef);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const [createTopic] = useMutation(CREATE_TOPIC, {
    update(cache, res) {
      const existingTopics = cache.readQuery({ query: GET_TOPICS });
      cache.writeQuery({
        query: GET_TOPICS,
        data: {
          topics: [
            ...(existingTopics?.topics ?? []),
            res.data?.createTopic,
          ] as any,
        },
      });
    },
  });

  function clear() {
    setTitle('');
    setPrompt('');
    setFile('');
  }

  async function onSubmit() {
    setIsSubmitting(true);
    try {
      await createTopic({
        variables: { input: { title, prompt, file } },
      });
      clear();
      onClose();
    } catch (e) {
      console.log(e);
    }
    setIsSubmitting(false);
  }

  return (
    <>
      <Box p="40px">
        <Flex justifyContent="space-between">
          <Text textStyle="h1" mb="24px">
            Topics
          </Text>
          <Box
            w="240px"
            as="button"
            onClick={() => {
              onOpen();
            }}
          >
            <Button label="Create a new topic" />
          </Box>
        </Flex>
        <Flex wrap="wrap">
          {data.topics.length > 0 ? (
            data.topics.map((topic) => (
              <Box mr="16px" mb="16px" key={topic?.id}>
                <Card
                  link={`${topic?.id}`}
                  title={topic?.title ?? ''}
                  subtext={topic?.prompt ?? ''}
                />
              </Box>
            ))
          ) : (
            <Text>No data</Text>
          )}
        </Flex>
      </Box>

      <Modal
        onClose={() => {
          clear();
          onClose();
        }}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textStyle="h1">Create a topic</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="16px">
              <Text textStyle="p" mb="4px">
                Title
              </Text>
              <Input
                textStyle="p"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title..."
                _placeholder={{
                  fontFamily: `'Poppins', sans-serif`,
                  fontSize: 12,
                }}
                isRequired
              />
            </FormControl>
            <FormControl mb="16px">
              <Text textStyle="p" mb="4px">
                Prompt
              </Text>
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                textStyle="p"
                type="text"
                placeholder="Prompt..."
                _placeholder={{
                  fontFamily: `'Poppins', sans-serif`,
                  fontSize: 12,
                }}
              />
            </FormControl>
            <Flex justifyContent="center" alignItems="center" mb="16px">
              <Divider />
              <Text textStyle="h3">OR</Text>
              <Divider />
            </Flex>
            <FileUploader
              handleChange={async (file: File) => {
                await uploadFileToBlob(file);
                const url = `https://helmetstorage.blob.core.windows.net/helmet-pdfs/${file.name}`;
                setFile(url);
                toast({
                  title: 'File uploaded',
                });
              }}
              name="file"
              types={fileTypes}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              label="Save"
              active
              disabled={
                title.length === 0 || (prompt.length === 0 && file.length === 0)
              }
              loading={isSubmitting}
              onClick={() => {
                onSubmit();
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
