import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { apiUrl } from './utility/function';
import { createClient, Provider as UrqlProvider } from 'urql';

const token = localStorage.getItem('yu');

// todo: auth exchange refreshes token every request ...
const client = createClient({
  url: `${apiUrl()}/graphql`,
  fetchOptions: {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token || ''}`,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </UrqlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
