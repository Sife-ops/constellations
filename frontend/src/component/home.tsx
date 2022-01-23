import React from "react";
import { isValid } from "../utility/token";

export const Home: React.FC = () => {
  return (
    <div>
      home
      <br />
      <button
        onClick={() => {
          const token = localStorage.getItem("yu") || "";
          console.log(token, "valid:", isValid(token));
        }}
      >
        log access token
      </button>
    </div>
  );
};
