import { AuthConfig } from '@urql/exchange-auth';
import { Operation } from 'urql';
import { env } from './constant';
import { isValid } from './token';

export const authConfig: AuthConfig<{ accessToken: string }> = {
  willAuthError: ({ authState }) => {
    if (!authState) return true;
    if (!isValid(authState.accessToken, 10000)) return true;
    return false;
  },

  getAuth: async ({ authState }) => {
    if (!authState) {
      const accessToken = localStorage.getItem('yu');
      if (accessToken) return { accessToken };
      return null;
    }

    const res = await fetch(`${env.url.api}/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: authState.accessToken,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();

    localStorage.setItem('yu', data.accessToken);

    return { accessToken: data.accessToken };
  },

  addAuthToOperation: ({ authState, operation }): Operation<any, any> => {
    if (!authState || !authState.accessToken) {
      return operation;
    }

    const fetchOptions: RequestInit = {
      credentials: 'include',
    };

    // can't use 'makeOperation'
    return {
      ...operation,
      context: {
        ...operation.context,
        fetchOptions: {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            authorization: authState.accessToken,
          },
        },
      },
    };
  },
};
