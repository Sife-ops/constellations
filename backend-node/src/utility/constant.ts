export const env = {
  prod: process.env.PROD ? true : false,
  secret: {
    accessToken: process.env.SECRET_ACCESS_TOKEN || "access",
    refreshToken: process.env.SECRET_REFRESH_TOKEN || "refresh",
  },
};
