import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dev } from './component/dev/dev';
import { Home } from './component/home/home';
import { Login } from './component/login';
import { Register } from './component/register';
import { Reset } from './component/reset';
import { apiUrl } from './utility/function';
import { Box, Button } from '@chakra-ui/react';

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

  if (loggedIn) {
    return (
      <BrowserRouter>
        <div className="page">
          <Box borderRadius="lg" borderWidth="1px" className="block">
            <Button onClick={handleLogout} className="element">
              Sign Out
            </Button>
          </Box>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/dev" element={<Dev />} />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className='page'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
