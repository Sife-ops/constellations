import React from "react";
import { getAccessToken } from "../utility/token";

export const Dev: React.FC = () => {
  return (
    <div>
      <button
        onChange={() => {
          console.log(getAccessToken());
        }}
      >
        log access token
      </button>
    </div>
  );
};
