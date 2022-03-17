interface Env {
  origin: string[];
  port: number;
  prod: boolean;
  secret: {
    captcha: string | undefined;
    token: {
      access: string;
      refresh: string;
    };
  };
  seed: boolean;
  url: {
    prod: string | undefined;
  };
}

const isProd = (): boolean => {
  if (process.env.VITE_PROD_URL) return true;
  return false;
};

const origin = (): string[] => {
  const urlProd = process.env.VITE_PROD_URL;
  if (urlProd) return [urlProd];
  return [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://studio.apollographql.com',
  ];
};

const port = (): number => {
  if (isProd()) return 80;
  return 4000;
};

export const env: Env = {
  origin: origin(),
  port: port(),
  prod: isProd(),
  secret: {
    captcha: process.env.CAPTCHA_SECRET,
    token: {
      access: process.env.SECRET_ACCESS_TOKEN || 'access',
      refresh: process.env.SECRET_REFRESH_TOKEN || 'refresh',
    },
  },
  seed: process.env.SEED ? true : false,
  url: {
    prod: process.env.VITE_PROD_URL,
  },
};
