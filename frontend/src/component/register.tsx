import React from "react";
import { register } from "../utility/request";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

export const Register: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [result, mutation] = useMutation(register);

  const navigate = useNavigate();

  const debouncedSave = React.useRef(
    _.debounce((nextValue) => console.log("sup"), 1000)
  ).current;

  const handleChange = (e: any) => {
    const { value: nextValue } = e.target;
    setEmail(nextValue);
    debouncedSave(nextValue);
  };

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
            //
            value={email}
            placeholder="email"
            type="text"
            onChange={handleChange}
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
