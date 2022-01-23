import React from "react";
import { useQuery } from "urql";
import { user } from "../utility/request";

export const AuthTest: React.FC = () => {
  const token = localStorage.getItem("yu");

  const [res, reexec] = useQuery({
    query: user,
    variables: {
      userId: 1,
    },
    requestPolicy: "network-only",
  });

  if (res.fetching) return <div>loading...</div>;
  if (res.error) {
    console.log(res.error);
    return <div>error</div>;
  }

  return <div>authtest</div>;
};
