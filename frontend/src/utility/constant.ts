export const env: Env = {
  prod: import.meta.env.VITE_PROD ? true : false,
  ngrok_url: (import.meta.env.VITE_NGROK_URL as string) || "",
};

interface Env {
  prod: boolean;
  ngrok_url: string;
}
