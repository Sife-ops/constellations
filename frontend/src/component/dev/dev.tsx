import React from "react";
import { AuthTest } from "./auth-test";
import { apiUrl } from "../../utility/function";
import { isValid } from "../../utility/token";

export const Dev: React.FC = () => {
  const handleLogout = () => {
    console.log("logout");
    fetch(`${apiUrl()}/logout`, {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        localStorage.removeItem("yu");
        window.location.reload();
      }
    });
  };

  const handleLogToken = () => {
    const token = localStorage.getItem("yu") || "";
    console.log(token, "valid:", isValid(token));
  };

  return (
    <div>
      <button className="auto-logout" onClick={handleLogout}>
        logout
      </button>
      <br />
      <button onClick={handleLogToken}>log access token</button>
      <br />
      <AuthTest />
    </div>
  );
};
