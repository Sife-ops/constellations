import React from "react";
import { AuthTest } from "./auth-test";
import { isValid } from "../../utility/token";

export const Dev: React.FC = () => {
  return (
    <div>
      <button
        onClick={() => {
          const token = localStorage.getItem("yu") || "";
          console.log(token, "valid:", isValid(token));
        }}
      >
        log access token
      </button>
      <br />
      <AuthTest />
    </div>
  );
};
