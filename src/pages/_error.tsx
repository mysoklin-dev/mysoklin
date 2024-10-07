import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

interface CustomErrorPageProps {
  statusCode?: number;
  message?: string;
}

const CustomErrorPage: React.FC<CustomErrorPageProps> = ({
  statusCode,
  message,
}) => {
  const router = useRouter();

  const handleRetry = () => {
    router.reload();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Head>
        <title>Error Occurred | Your App Name</title>
      </Head>
      <main className="px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-red-600">
          Oops! An Error Occurred
        </h1>
        <p className="mb-6 text-xl text-gray-700">
          {statusCode
            ? `Error ${statusCode}: ${
                message || 'An unexpected error occurred'
              }`
            : 'An unexpected client-side error occurred'}
        </p>
        <p className="text-md mb-8 text-gray-600">
          We apologize for the inconvenience. Please try again or return to the
          homepage.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={handleRetry}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
          >
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="rounded bg-gray-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-gray-600"
          >
            Go to Homepage
          </button>
        </div>
      </main>
    </div>
  );
};

export default CustomErrorPage;
