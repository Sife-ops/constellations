interface Env {
  secret: {
    recaptcha: string | undefined;
  };
  url: {
    api: string;
  };
}

export const url_api = (): string => {
  const url = import.meta.env.VITE_PROD_URL as string | undefined;
  if (url) return url;
  return 'http://localhost:4000';
};

export const env: Env = {
  secret: {
    recaptcha: import.meta.env.VITE_RECAPTCHA_KEY as string | undefined,
  },
  url: {
    api: url_api(),
  },
};

interface Ex {
  email: RegExp;
}

export const ex: Ex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
