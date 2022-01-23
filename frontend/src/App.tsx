import "./App.css";
import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Dev } from "./component/dev";
import { Home } from "./component/home";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { setAccessToken } from "./utility/token";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("http://localhost:4000/refresh", {
      method: "POST",
      credentials: "include",
    }).then((res) =>
      res.json().then((data) => {
        // console.log(data);
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          setLoggedIn(true);
        }
        setLoading(false);
      })
    );
  }, []);

  const handleLogout = () => {
    console.log("logout");
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    }).then((res) =>
      res.json().then((data) => {
        // console.log(data);
        window.location.reload();
      })
    );
  };

  if (loading) return <div>loading...</div>;

  if (loggedIn)
    return (
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/home">home</Link>
          </li>
          <li>
            <Link to="/dev">dev</Link>
          </li>
          <li>
            <button onClick={handleLogout}>logout</button>
          </li>
        </ul>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </BrowserRouter>
    );

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
}

export default App;
