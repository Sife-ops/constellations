import React from "react";
import { apiUrl } from "../utility/function";

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`${apiUrl()}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }).then(async (res) => {
            if (res.ok) {
              const data = await res.json();
              localStorage.setItem("yu", data.accessToken);
            } else {
              localStorage.removeItem("yu");
            }
            window.location.reload();
          });
        }}
      >
        <div>
          <input
            id="login-email"
            value={email}
            placeholder="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            id="login-password"
            value={password}
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="login-submit" type="submit">login</button>
      </form>
    </div>
  );
};
