import './App.css';
import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { BoxOutlined } from './component/box-outlined';
import { Dev } from './component/dev/dev';
import { Home } from './component/home/home';
import { Landing } from './component/landing';
import { Login } from './component/login';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Register } from './component/register';
import { Reset } from './component/reset';
import { Settings } from './component/settings/settings';
import { apiUrl } from './utility/function';
import { isValid } from './utility/token';
import { useForceUpdate } from './utility/function';

export const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  // const [update, forceUpdate] = useForceUpdate(); // todo: delete

  React.useEffect(() => {
    const token = localStorage.getItem('yu');
    if (token && isValid(token)) setLoggedIn(true);
  });

  React.useEffect(() => {
    const checkToken = setInterval(() => {
      const token = localStorage.getItem('yu');
      if (loggedIn) {
        if (token && isValid(token)) return console.log('token valid'); // todo: delete
        console.log('token invalid') // todo: delete
        localStorage.removeItem('yu');
        setLoggedIn(false);
        return;
      }
    }, 5000);
    return () => clearInterval(checkToken);
  });

  /**
   * remove tokens
   */
  const handleLogout = () => {
    fetch(`${apiUrl()}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        localStorage.removeItem('yu');
        // todo: WHY RERENDER DOES NOT WORK
        // forceUpdate();
        window.location.reload();
      }
    });
  };

  return (
    <div
      className="page"
      style={{
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
      }}
    >
      <BoxOutlined className="block navbar">
        <Box>
          <Button className="element" onClick={() => navigate('/')} size="xs">
            Home
          </Button>
          {loggedIn && (
            <Button className="element" onClick={() => navigate('settings')} size="xs">
              Settings
            </Button>
          )}
          <Button className="element" size="xs">
            About
          </Button>
          <Button className="element" size="xs">
            Donate
          </Button>
        </Box>
        {loggedIn ? (
          <Button className="element" colorScheme="red" onClick={handleLogout} size="xs">
            Sign Out
          </Button>
        ) : (
          <Button className="element" colorScheme="blue" onClick={() => navigate('login')} size="xs">
            Sign In
          </Button>
        )}
      </BoxOutlined>
      {loggedIn ? (
        <Routes>
          <Route path="/dev" element={<Dev />} />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
    </div>
  );
};
