import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { apiUrl } from './utility/function';
import { authConfig } from './utility/auth-config';
import { authExchange } from '@urql/exchange-auth';
import { createClient, Provider as UrqlProvider } from 'urql';
import { fetchExchange } from 'urql';

const client = createClient({
  url: `${apiUrl()}/graphql`,
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    authExchange(authConfig),
    fetchExchange, // needed
  ],
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
