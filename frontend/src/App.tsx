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
import { useForceUpdate } from './utility/function';

function App() {
  const [update, forceUpdate] = useForceUpdate();

  const [loggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  /**
   * get tokens
   */
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
    });
  }, [update]);

  /**
   * remove tokens
   */
  const handleLogout = () => {
    console.log('logout');
    fetch(`${apiUrl()}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        localStorage.removeItem('yu');
        setLoggedIn(false);
      }
    });
  };

  return (
    <div className="page">
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
          <Button className="element" onClick={handleLogout} size="xs">
            Sign Out
          </Button>
        ) : (
          <Button className="element" onClick={() => navigate('login')} size="xs">
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
          <Route path="/login" element={<Login className='block' forceUpdate={forceUpdate} />} />
          <Route path="/register" element={<Register className='block' />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
