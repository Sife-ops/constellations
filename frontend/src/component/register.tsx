import React from "react";
import _ from "lodash";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";
import { userExists } from "../utility/request";

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [userEsxistsResult, userExistsMutation] = useMutation(userExists);

  const [
    //
    emailExists,
    setEmailExists,
  ] = React.useState<JSX.Element | null>(null);

  const [
    //
    usernameExists,
    setUsernameExists,
  ] = React.useState<JSX.Element | null>(null);

  const [
    //
    successFailure,
    setSuccessFailure,
  ] = React.useState<JSX.Element | null>(null);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch("http://localhost:4000/register", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    }).then((res) => {
      console.log(res);

      res.json().then((e) => {
        console.log(e);
      });

      // todo: show success, timeout, go to login
      if (res.ok) {
        setSuccessFailure(<div>Success.</div>);
        setTimeout(() => {
          navigate("login");
        }, 3000);
        return;
      }

      setSuccessFailure(<div>Something went wrong.</div>);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        {successFailure}
      </form>
    </div>
  );
};
