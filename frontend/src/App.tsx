import "./App.css";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Dev } from "./component/dev/dev";
import { Home } from "./component/home";
import { Login } from "./component/login";
import { Register } from "./component/register";
import { Reset } from "./component/reset";
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

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (loggedIn) {
    return (
      <BrowserRouter>
        <ul>
          <li>
            <Link className="auto-nav__home" to="/home">
              home
            </Link>
          </li>
          <li>
            <Link className="auto-nav__dev" to="/dev">
              dev
            </Link>
          </li>
          <li>
            <button className="auto-logout" onClick={handleLogout}>
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
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
