import React from "react";
import { useMutation } from "urql";

const login = `
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

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
            console.log(res.data.login);
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
