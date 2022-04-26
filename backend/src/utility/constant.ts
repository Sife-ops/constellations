interface Env {
  origin: string[];
  port: number;
  prod: boolean;
  secret: {
    captcha: string | undefined;
    token: {
      access: string; // todo: add '| undefined'
    };
  };
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
    },
  },
  url: {
    prod: process.env.VITE_PROD_URL,
  },
};
