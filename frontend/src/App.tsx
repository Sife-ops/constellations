import './App.css';
import React from 'react';
import { AppDrawer } from './component/app-drawer';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dev } from './component/dev/dev';
import { Home } from './component/home';
import { LoadingSpinner } from './component/loading-spinner';
import { Login } from './component/login';
import { Navbar } from './component/navbar';
import { Register } from './component/register';
import { Reset } from './component/reset';
import { apiUrl } from './utility/function';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${apiUrl()}/refresh`, {
      method: 'POST',
      credentials: 'include',
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('yu', data.accessToken);
        setLoggedIn(true);
      }
      setLoading(false);
    });
  }, []);

  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const drawerToggle = (open: boolean) => {
    return (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };
  };

  if (loading) return <LoadingSpinner />

  if (loggedIn) {
    return (
      <BrowserRouter>
        <AppDrawer open={drawerOpen} toggle={drawerToggle} />
        <Navbar drawerToggle={drawerToggle} />
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
