interface Env {
  ngrok_url: string | undefined;
  prod_url: string | undefined;
  secret: {
    captcha: string | undefined;
    token: {
      access: string;
      refresh: string;
    };
  };
  seed: boolean;
}

export const env: Env = {
  ngrok_url: process.env.VITE_NGROK_URL || undefined,
  prod_url: process.env.VITE_PROD_URL || undefined,
  secret: {
    captcha: process.env.CAPTCHA_SECRET || undefined,
    token: {
      access: process.env.SECRET_ACCESS_TOKEN || 'access',
      refresh: process.env.SECRET_REFRESH_TOKEN || 'refresh',
    },
  },
  seed: process.env.SEED ? true : false,
};
