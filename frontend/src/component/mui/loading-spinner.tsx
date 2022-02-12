import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    </div>
  );
};
