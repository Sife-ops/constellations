import "./App.css";
import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Dev } from "./component/dev";
import { Home } from "./component/home";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { apiUrl } from "./utility/function";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${apiUrl()}/refresh`, {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("yu", data.accessToken);
        setLoggedIn(true);
      }
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    console.log("logout");
    fetch(`${apiUrl()}/logout`, {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        localStorage.removeItem("yu");
        window.location.reload();
      }
    });
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
            <button id="logout" onClick={handleLogout}>
              logout
            </button>
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
