import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { apiUrl } from "./utility/function";
import { authConfig } from "./utility/auth-config";
import { authExchange } from "@urql/exchange-auth";
import { createClient, Provider as UrqlProvider } from "urql";
import { fetchExchange } from "urql";

const client = createClient({
  url: `${apiUrl()}/graphql`,
  exchanges: [
    authExchange(authConfig),
    fetchExchange, // needed
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <App />
    </UrqlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
