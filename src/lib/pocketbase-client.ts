import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

pb.authStore.onChange(() => {
  if (!pb.authStore.isValid) {
    pb.authStore.clear();
  }
});

export default pb;
