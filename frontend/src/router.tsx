import App from "./App";
import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { setAccessToken } from "./utility/token";

export const Router: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("http://localhost:4000/refresh", {
      method: "POST",
      credentials: "include",
    }).then((res) =>
      res.json().then((data) => {
        console.log(data);
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          setLoggedIn(true);
        }
        setLoading(false);
      })
    );
  }, []);

  if (loading) return <div>loading...</div>;

  if (loggedIn) return <App />;

  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
