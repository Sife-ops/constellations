export const env: Env = {
  ngrok_url: process.env.VITE_NGROK_URL || "",
  prod: process.env.VITE_PROD ? true : false,
  secret: {
    accessToken: process.env.SECRET_ACCESS_TOKEN || "access",
    refreshToken: process.env.SECRET_REFRESH_TOKEN || "refresh",
  },
};

interface Env {
  ngrok_url: string;
  prod: boolean;
  secret: {
    accessToken: string;
    refreshToken: string;
  };
}
