import React from "react";
import { getAccessToken } from "../utility/token";
import { isValid } from "../utility/token";

export const Home: React.FC = () => {
  return (
    <div>
      home
      <br />
      <button
        onClick={() => {
          const token = getAccessToken();
          console.log(token, "valid:", isValid(token));
        }}
      >
        log access token
      </button>
    </div>
  );
};
