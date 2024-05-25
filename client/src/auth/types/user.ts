export type UserType = {
  id: string;
  email: string;
  isAdmin: boolean;
};

export type SignupApiRes = {
  message: string;
};

export type SigninApiRes = {
  message: string;
  token: string;
  userId: string;
  email: string;
};
