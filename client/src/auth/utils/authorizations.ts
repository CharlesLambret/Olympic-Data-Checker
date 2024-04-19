import Cookies from "js-cookie";

export const setTokenCookie = (token: string) => {
  const ONE_WEEK = 7 * 24 * 60 * 60;

  const cookiesOptions = {
    maxAge: ONE_WEEK,
    path: "/",
  };
  Cookies.set("token", token, cookiesOptions);
};

export const getTokenFromCookie = () => {
  const { token } = Cookies.get();
  return token;
};

export const getAuthorizationTokenHeader = () => {
  const token = getTokenFromCookie();
  if (token) {
    return { authorization: `Bearer ${token}` };
  }
  return {};
};

export const removeAuthorization = () => {
  Cookies.remove("token");
};
