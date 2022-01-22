import React from "react";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";

const register = `
    mutation Register($password: String!, $username: String!, $email: String!) {
        register(password: $password, username: $username, email: $email) {
            id
            email
            username
        }
    }
`;

export const Register: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [result, mutation] = useMutation(register);

  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(email, username, password);

          mutation({
            email,
            username,
            password,
          }).then((res) => {
            console.log(res);
            navigate("/login");
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
            value={username}
            placeholder="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">register</button>
      </form>
    </div>
  );
};
