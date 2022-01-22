let token: string = ""

export const getAccessToken = (): string => token;

export const setAccessToken = (s: string): string => {
    token = s;
    return token;
}
