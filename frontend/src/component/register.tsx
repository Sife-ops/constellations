import React from "react";
import _ from "lodash";
import { register } from "../utility/request";
import { useMutation, useQuery } from "urql";
import { useNavigate } from "react-router-dom";
import { userExists } from "../utility/request";

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [registerResult, registerMutation] = useMutation(register);
  const [userEsxistsResult, userExistsMutation] = useMutation(userExists);

  const [
    //
    emailExists,
    setEmailExists,
  ] = React.useState<null | JSX.Element>(null);

  const [
    //
    usernameExists,
    setUsernameExists,
  ] = React.useState<null | JSX.Element>(null);

  // todo: abstract debounce functions
  // todo: reusable login/register component
  const debounceEmail = React.useRef(
    _.debounce((nextValue) => {
      if (nextValue) {
        userExistsMutation({ email: nextValue }).then((res) => {
          if (res.data?.userExists) {
            setEmailExists(<div>already registered</div>);
            return;
          }
          setEmailExists(<div>available</div>);
        });
      }
      setEmailExists(null);
    }, 1000)
  ).current;

  const debounceUsername = React.useRef(
    _.debounce((nextValue) => {
      if (nextValue) {
        userExistsMutation({ username: nextValue }).then((res) => {
          if (res.data?.userExists) {
            setUsernameExists(<div>already registered</div>);
            return;
          }
          setUsernameExists(<div>available</div>);
        });
      }
      setUsernameExists(null);
    }, 1000)
  ).current;

  const handleEmail = (e: any) => {
    const { value: nextValue } = e.target;
    setEmail(nextValue);
    debounceEmail(nextValue);
  };

  const handleUsername = (e: any) => {
    const { value: nextValue } = e.target;
    setUsername(nextValue);
    debounceUsername(nextValue);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(email, username, password);
          registerMutation({
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
            onChange={handleEmail}
          />
        </div>
        {emailExists}
        <div>
          <input
            value={username}
            placeholder="username"
            type="text"
            onChange={handleUsername}
          />
        </div>
        {usernameExists}
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
