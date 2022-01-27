import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { apiUrl } from "./utility/function";
import { authConfig } from "./utility/auth-config";
import { authExchange } from "@urql/exchange-auth";
import { createClient, Provider as UrqlProvider } from "urql";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchExchange } from "urql";

const theme = createTheme();

const client = createClient({
  url: `${apiUrl()}/graphql`,
  fetchOptions: {
    credentials: "include"
  },
  exchanges: [
    authExchange(authConfig),
    fetchExchange, // needed
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </UrqlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
