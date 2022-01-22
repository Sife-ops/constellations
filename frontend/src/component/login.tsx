import React from "react";
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

          mutation({
            email,
            password,
          }).then((res) => {
            console.log("login:", res.data.login);
            window.location.reload();
          });
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
