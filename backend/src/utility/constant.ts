interface Env {
  ngrok_url: string;
  prod_url: string;
  secret: {
    accessToken: string;
    refreshToken: string;
  };
  seed: boolean;
}

export const env: Env = {
  ngrok_url: process.env.VITE_NGROK_URL || '',
  prod_url: process.env.VITE_PROD_URL || '',
  secret: {
    accessToken: process.env.SECRET_ACCESS_TOKEN || 'access',
    refreshToken: process.env.SECRET_REFRESH_TOKEN || 'refresh',
  },
  seed: process.env.SEED ? true : false,
};
