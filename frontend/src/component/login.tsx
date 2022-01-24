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
          }).then((res) =>
            res.json().then((data: { ok: boolean; accessToken: string }) => {
              if (data.ok) {
                localStorage.setItem("yu", data.accessToken);
              } else {
                localStorage.removeItem("yu");
              }
              window.location.reload();
            })
          );
        }}
      >
        <div>
          <input
            value={email}
            placeholder="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            value={password}
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
