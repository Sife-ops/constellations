import React from "react";
import { useQuery } from "urql";
import { _dev2 } from "../../utility/request";

export const AuthTest: React.FC = () => {
  const [res, reexec] = useQuery({
    query: _dev2,
    requestPolicy: "network-only",
  });

  if (res.fetching) return <div>loading...</div>;

  if (res.error) {
    console.log(res.error);
    return <div>error</div>;
  }

  return <div className="auto-authTest">authtest: {JSON.stringify(res.data)}</div>;
};
