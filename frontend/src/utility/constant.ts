interface Env {
  prod_url: string;
  ngrok_url: string;
  recaptcha_key: string;
}

export const env: Env = {
  prod_url: (import.meta.env.VITE_PROD_URL as string) || '',
  ngrok_url: (import.meta.env.VITE_NGROK_URL as string) || '',
  recaptcha_key: (import.meta.env.VITE_RECAPTCHA_KEY as string) || '',
};

interface Ex {
  email: RegExp;
}

export const ex: Ex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
