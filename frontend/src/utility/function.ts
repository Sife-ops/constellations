import { env } from "./constant";

export const apiUrl = (): string => {
  if (env.prod) return "prod url";
  if (env.ngrok_url) return env.ngrok_url + "/api";
  return "http://localhost:4000";
};
