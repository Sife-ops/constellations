import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { createClient, Provider as UrqlProvider } from "urql";
import { getAccessToken } from "./utility/token";
import decode, { JwtPayload } from "jwt-decode";

const client = createClient({
  url: "http://localhost:4000/graphql",
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
