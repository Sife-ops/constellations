import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "./router";
import { createClient, Provider as UrqlProvider } from "urql";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  }
});

ReactDOM.render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <Router />
    </UrqlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
