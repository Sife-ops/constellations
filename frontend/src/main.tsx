import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import decode, { JwtPayload } from "jwt-decode";
import { authExchange, AuthConfig } from "@urql/exchange-auth";
import { getAccessToken, setAccessToken } from "./utility/token";

import {
  //
  createClient,
  makeOperation,
  Operation,
  Provider as UrqlProvider,
} from "urql";

const authConfig: AuthConfig<{ accessToken: string }> = {
  getAuth: async ({ authState }) => {
    debugger;
    console.log("getAuth");
    if (!authState) {
      const accessToken = getAccessToken();
      console.log("getAuth - access token:", accessToken);
      if (accessToken) {
        console.log("getAuth - access token:", accessToken);
        return { accessToken };
      }
      console.log("getAuth - fuck");
      return null;
    }

    console.log("getAuth - refreshing");
    const res = await fetch("http://localhost:4000/refresh", {
      method: "POST",
      credentials: "include",
    });
    const data = (await res.json()) as {
      ok: boolean;
      accessToken: string;
    };

    if (data.ok) {
      console.log("getAuth - set access token");
      setAccessToken(data.accessToken);
      return {
        accessToken: data.accessToken,
      };
    }

    console.log("getAuth - refresh token expired");
    return null;
  },
  addAuthToOperation: ({ authState, operation }): Operation<any, any> => {
    debugger;
    console.log("addAuthToOperation");
    console.log(authState);
    if (!authState || !authState.accessToken) {
      return operation;
    }

    const fetchOptions: RequestInit = {
      credentials: "include",
    };

    console.log("addAuthToOperation - make operation");
    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authState.accessToken}`,
        },
      },
    });
  },
};

const client = createClient({
  url: "http://localhost:4000/graphql",

  // fetchOptions:

  exchanges: [authExchange(authConfig)],

  // fetchOptions: () => {
  //   const token = getAccessToken();
  //   if (token) {
  //     return includeCredentials({
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         Accept: "application/vnd.github.packages-preview+json",
  //       },
  //     });
  //   }
  //   return includeCredentials();
  // },
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
