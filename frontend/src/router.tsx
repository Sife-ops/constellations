// import App from "./App";
import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./component/login";
import { Register } from "./component/register";

export const Router: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  if (loggedIn) {
    return (
      //
      <div>app</div>
    );
  }

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
