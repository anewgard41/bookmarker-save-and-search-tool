import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
