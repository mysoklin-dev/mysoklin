export type TAuthProvider = {
  authUrl: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  codeVerifier: string;
  name: string;
  state: string;
};

export type TListAuthMethods = {
  authProviders: TAuthProvider[];
  emailPassword: boolean;
  usernamePassword: boolean;
};

export type TCreateUserPayload = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  emailVisibility: boolean;
  province: string;
  city: string;
  address: string;
  post_code: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  token: string;
};

export type TChangePasswordPayload = {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
};
