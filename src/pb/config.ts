/* eslint-disable no-console */
import PocketBase from 'pocketbase';
import type { QueryClient } from 'react-query';

export interface PeepResponse {
  id: string;
  created: string;
  updated: string;
  '@collectionId': string;
  '@collectionName': string;
  age: number;
  bio: string;
  name: string;
  '@expand': {};
}

// export const client = new PocketBase("http://192.168.43.238:8090");

export const client = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);
export const redirectUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://mysoklin.com/redirect'
    : 'http://localhost:3000/redirect';

// export const getAdmin = async () => {
//     return await client.admins.authViaEmail(
//       "denniskinuthiaw@gmail.com",
//       "SBwptpWeAN9BezV"
//     );
// };
export const providers = await client.collection('users').listAuthMethods();
// console.log("provider data === ",providers)
// export const oAuthSignIn=async()=>{
//   const providers = await client.users.listAuthMethods();
//   const provider = providers.authProviders[0];

//   console.log(" provider vars ==== ",
//     provider.name,

//     provider.codeVerifier,
//     redirectUrl
//   );
//   // authenticate
//   const authRes = await client.users.authViaOAuth2(
//     provider.name,
//     // @ts-ignore
//     params.get("code"),
//     provider.codeVerifier,
//     redirectUrl
//   );

//   console.log("succefull auth == ",authRes)
//   return authRes;
// }

export const appendToCache = async (
  index: [string],
  queryClient: QueryClient,
  newData: any
) => {
  queryClient.setQueryData(index, (old: any) => {
    old.unshift(newData);
    return old;
  });
};

export const realTime = async (index: [string], queryClient: QueryClient) => {
  // eslint-disable-next-line func-names
  return client.realtime.subscribe('peeps', function (e) {
    console.log('real time peeps', e.record);
    appendToCache(index, queryClient, e.record);
    //    queryClient.setQueryData(["peeps", { id: e.record.id }], e.record);
  });
};

export const getPrevdata = (index: [string], queryClient: QueryClient) => {
  const previous = queryClient.getQueryData(index);
  console.log('previous items', previous);
};
