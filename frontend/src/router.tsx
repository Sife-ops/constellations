// import App from "./App";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
