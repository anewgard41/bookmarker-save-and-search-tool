import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

// graphQL endpoint for Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql',
});

// middleware to set the token to the auth header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Apollo Client instance that executes authLink before httpLink
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
    </>
  );
}

export default App;
