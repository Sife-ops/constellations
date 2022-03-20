import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { authConfig } from './utility/auth-config';
import { authExchange } from '@urql/exchange-auth';
import { createClient, fetchExchange, Provider as UrqlProvider } from 'urql';
import { env } from './utility/constant';

const client = createClient({
  url: `${env.url.api}/graphql`,
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [authExchange(authConfig), fetchExchange],
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
