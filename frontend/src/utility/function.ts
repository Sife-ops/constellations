import React from 'react';

export const emailIsValid = (s: string): boolean => {
  const ex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return ex.test(s.toLowerCase());
};

export const passwordIsValid = (s: string): boolean => {
  // if (s === '') return false;
  if (s.length < 8) return false;
  if (!/[0-9]/.test(s)) return false;
  if (!/[!@#\$%\^\&*\)\(+=._-]/.test(s)) return false;
  return true;
};

export const useForceUpdate = (): [number, () => void] => {
  const [state, setState] = React.useState<number>(1);
  const forceUpdate = () => setState((s) => ++s);
  return [state, forceUpdate];
};

export const usernameIsValid = (s: string): boolean => {
  // if (s === '') return false;
  if (s.length < 5 || s.length > 15) return false;
  if (/\W/.test(s)) return false;
  return true;
};
