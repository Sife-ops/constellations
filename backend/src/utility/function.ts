export const captchaUrl = (secret: string, input: string): string => {
  return `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${input}`;
};
