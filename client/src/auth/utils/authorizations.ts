import Cookies from "js-cookie";

export const setTokenCookie = (token: string) => {
  const ONE_WEEK = 7;

  Cookies.set("token", token, {
    expires: ONE_WEEK,
    path: "/",
  });
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

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};
