import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex  flex-col items-center justify-center bg-gray-100 py-16">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>

      <main className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <p className="mb-8 text-2xl text-gray-600">Oops! Page not found.</p>
        <button
          onClick={() => router.push('/')}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
        >
          Go back home
        </button>
      </main>
    </div>
  );
}
