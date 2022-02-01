import "./App.css";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { C2 } from "./component/c2";
import { Dev } from "./component/dev/dev";
import { Home } from "./component/home";
import { Login } from "./component/login";
import { Navbar } from "./component/navbar";
import { Register } from "./component/register";
import { Reset } from "./component/reset";
import { apiUrl } from "./utility/function";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) => {
    return (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };
  };

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

  React.useEffect(() => {
    console.log(drawerOpen);
  }, [drawerOpen]);

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
        <C2 open={drawerOpen} toggle={toggleDrawer} />
        <Navbar toggleDrawer={toggleDrawer} />
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
