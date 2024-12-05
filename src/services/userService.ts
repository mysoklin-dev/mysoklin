import { createMutation, createQuery } from 'react-query-kit';

import pb from '@/lib/pocketbase-client';

const GET_LIST_AUTH_METHODS = 'GET_LIST_AUTH_METHODS';

type TAuthProvider = {
  authUrl: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  codeVerifier: string;
  name: string;
  state: string;
};

type TListAuthMethods = {
  authProviders: TAuthProvider[];
  emailPassword: boolean;
  usernamePassword: boolean;
};

/**
 * Get List Auth Methods
 */
export const useGetListAuthMethods = createQuery({
  queryKey: [GET_LIST_AUTH_METHODS],
  fetcher: (): Promise<TListAuthMethods> => {
    return new Promise((resolve, reject) => {
      pb.collection('users')
        .listAuthMethods()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
});

/**
 * Create User
 */

export const useCreateUser = createMutation({
  mutationFn({
    payload,
  }: {
    payload: {
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
  }) {
    return new Promise((resolve, reject) => {
      pb.collection('users')
        .create(payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
});
