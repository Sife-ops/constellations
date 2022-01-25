import React from "react";
import { useQuery } from "urql";
import { user } from "../utility/request";

export const AuthTest: React.FC = () => {
  const [res, reexec] = useQuery({
    query: user,
    requestPolicy: "network-only",
  });

  if (res.fetching) return <div>loading...</div>;

  if (res.error) {
    console.log(res.error);
    return <div>error</div>;
  }

  return <div id="authtest">authtest: {JSON.stringify(res.data)}</div>;
};
