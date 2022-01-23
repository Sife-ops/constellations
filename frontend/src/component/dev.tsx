import React from "react";
import { AuthTest } from "./auth-test";
import { getAccessToken } from "../utility/token";

export const Dev: React.FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          const token = getAccessToken();
          console.log(token);
        }}
      >
        log access token
      </button>
      <br />
      <AuthTest />
    </div>
  );
};
