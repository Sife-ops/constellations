import './App.css';
import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dev } from './component/dev/dev';
import { BlockBox } from './component/block-box';
import { Home } from './component/home/home';
import { Login } from './component/login';
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

  const handleLogout = () => {
    console.log('logout');
    fetch(`${apiUrl()}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        localStorage.removeItem('yu');
        window.location.reload();
      }
    });
  };

  if (loading) return <div>loading...</div>;

  return (
    <BrowserRouter>
      <div className="page">
        <BlockBox>
          {loggedIn && (
            <>
              <Button className="element" onClick={handleLogout} size="xs">
                Sign Out
              </Button>
              <Button className="element" size="xs">
                Settings
              </Button>
            </>
          )}
          <Button className="element" size="xs">
            About
          </Button>
          <Button className="element" size="xs">
            Donate
          </Button>
        </BlockBox>
        {loggedIn ? (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
