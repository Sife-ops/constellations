import { AuthConfig } from "@urql/exchange-auth";
import { Operation } from "urql";
import { apiUrl } from "../utility/function";
import { isValid } from "./token";

export const authConfig: AuthConfig<{ accessToken: string }> = {
  willAuthError: ({ authState, operation }) => {
    if (!authState) return true;
    if (!isValid(authState.accessToken)) return true;
    return false;
  },
  getAuth: async ({ authState }) => {
    if (!authState) {
      const accessToken = localStorage.getItem("yu");
      if (accessToken) {
        return { accessToken };
      }
      return null;
    }

    const res = await fetch(`${apiUrl()}/refresh`, {
      method: "POST",
      credentials: "include",
    });
    const data = (await res.json()) as {
      ok: boolean;
      accessToken: string;
    };

    if (data.ok) {
      localStorage.setItem("yu", data.accessToken);
      return {
        accessToken: data.accessToken,
      };
    }

    return null;
  },
  addAuthToOperation: ({ authState, operation }): Operation<any, any> => {
    if (!authState || !authState.accessToken) {
      return operation;
    }

    const fetchOptions: RequestInit = {
      credentials: "include",
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
            authorization: `Bearer ${authState.accessToken}`,
          },
        },
      },
    };
  },
};
