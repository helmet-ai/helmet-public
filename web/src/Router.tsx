import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Home from './pages/HomePage';
import Story from './pages/StoryPage';
import Groups from './pages/GroupsPage';
import Topics from './pages/TopicsPage';
import Root from './Root';
import Color from './styles/Color';
import {
  ApolloClient,
  SuspenseCache,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import SideBar from './components/SideBar';
import TopicsFeed from './pages/TopicsFeed';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: (
          <>
            <SideBar active="Home" />
            <Home />
          </>
        ),
      },
      {
        path: '/stories/:id',
        element: (
          <>
            <SideBar active="Home" />
            <Story />
          </>
        ),
      },
      {
        path: '/topics/:id',
        element: (
          <>
            <SideBar active="Topics" />
            <TopicsFeed />
          </>
        ),
      },
      {
        path: '/topics',
        element: (
          <>
            <SideBar active="Topics" />
            <Topics />
          </>
        ),
      },

      {
        path: '/groups',
        element: (
          <>
            <SideBar active="Groups" />
            <Groups />
          </>
        ),
      },
    ],
  },
]);

const merriweather = `'Merriweather', serif`;
const poppins = `'Poppins', sans-serif`;

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: Color.background,
      },
    }),
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          fontFamily: poppins,
          fontSize: '14px',
          fontWeight: '400',
        },
      },
    },
  },
  fonts: {
    heading: merriweather,
    body: poppins,
  },
  textStyles: {
    h1: {
      fontSize: '28px',
      fontFamily: merriweather,
      fontWeight: '700',
    },
    h2: {
      fontSize: '20px',
      fontFamily: merriweather,
      fontWeight: '700',
    },
    h3: {
      fontFamily: poppins,
      fontSize: '12px',
      fontWeight: '600',
      color: Color.accent,
    },
    p: {
      fontFamily: poppins,
      fontSize: '18px',
      fontWeight: '400',
    },
    bold: {
      fontFamily: poppins,
      fontSize: '18px',
      fontWeight: '600',
    },
    subtext: {
      fontFamily: poppins,
      fontSize: '18px',
      fontWeight: '400',
      color: Color.subtext,
    },
    link: {
      fontFamily: poppins,
      fontSize: '14px',
      fontWeight: '400',
      color: Color.accent,
    },
  },
});

const suspenseCache = new SuspenseCache();
const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://helmet-ai.azurewebsites.net/graphql'
      : 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});
export default function App() {
  return (
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />;
      </ChakraProvider>
    </ApolloProvider>
  );
}
