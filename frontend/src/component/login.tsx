import React from "react";
import { getAccessToken, setAccessToken } from "../utility/token";
import { login } from "../utility/request";
import { useMutation } from "urql";

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [result, mutation] = useMutation(login);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(email, password);

          fetch("http://localhost:4000/login", {
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
                debugger;
                setAccessToken(data.accessToken);
              } else {
                setAccessToken("");
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
