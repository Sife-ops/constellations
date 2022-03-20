import React from 'react';
import { AuthTest } from './auth-test';
import { CodegenTest } from './codegen-test';
import { env } from '../../utility/constant';
import { isValid } from '../../utility/token';

export const Dev: React.FC = () => {
  const handleLogout = () => {
    console.log('logout');
    fetch(`${env.url.api}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        localStorage.removeItem('yu');
        window.location.reload();
      }
    });
  };

  const handleLogToken = () => {
    const accessToken = localStorage.getItem('yu') || '';
    console.log(accessToken, 'valid:', isValid(accessToken));
  };

  return (
    <div>
      <button className="auto-logout" onClick={handleLogout}>
        logout
      </button>
      <br />

      <button onClick={handleLogToken}>log access token</button>
      <br />

      <AuthTest />
      <br />

      <CodegenTest />
    </div>
  );
};
