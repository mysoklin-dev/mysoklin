import { createMutation, createQuery } from 'react-query-kit';

import pb from '@/lib/pocketbase-client';
import type {
  TCreateUserPayload,
  TListAuthMethods,
  TLoginPayload,
  TLoginResponse,
} from '@/types/user';

const GET_LIST_AUTH_METHODS = 'GET_LIST_AUTH_METHODS';

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
  mutationFn({ payload }: { payload: TCreateUserPayload }) {
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

export const useLogin = createMutation({
  mutationFn({ payload }: { payload: TLoginPayload }): Promise<TLoginResponse> {
    return new Promise((resolve, reject) => {
      pb.collection('users')
        .authWithPassword(payload.email, payload.password)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
});
