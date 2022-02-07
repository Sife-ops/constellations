interface Env {
  prod: boolean;
  ngrok_url: string;
}

export const env: Env = {
  prod: import.meta.env.VITE_PROD ? true : false,
  ngrok_url: (import.meta.env.VITE_NGROK_URL as string) || '',
};

interface Ex {
  email: RegExp;
}

export const ex: Ex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
