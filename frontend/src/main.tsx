import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import decode, { JwtPayload } from "jwt-decode";
import { authExchange, AuthConfig } from "@urql/exchange-auth";
import { getAccessToken } from "./utility/token";

import {
  //
  createClient,
  Provider as UrqlProvider,
} from "urql";

const authConfig: AuthConfig<{ accessToken: string }> = {
  getAuth: async ({ authState }) => {
    if (!authState) {
      const accessToken = getAccessToken();
      if (accessToken) return { accessToken };
      return null;
    }

    const res = await fetch("http://localhost:4000/refresh", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    const accessToken = data.accessToken as string;
  },
};

const client = createClient({
  url: "http://localhost:4000/graphql",

  // exchanges: [authExchange(authConfig)],

  fetchOptions: () => {
    const token = getAccessToken();
    if (token) {
      return includeCredentials({
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.packages-preview+json",
        },
      });
    }
    return includeCredentials();
  },
});

ReactDOM.render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <App />
    </UrqlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

const includeCredentials = (o: RequestInit = {}): RequestInit => ({
  ...o,
  credentials: "include",
});

const isValid = (t: string): boolean => {
  if (!t) return false;
  const decoded = decode<JwtPayload>(t);
  const now = new Date().getTime();
  if (now > decoded.exp! * 1000) return false;
  return true;
};
