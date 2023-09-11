import Head from 'next/head';

const AdminHome = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <style>{`
          .main-header {
            display: none!important;
          }
        `}</style>
      </Head>
      <h2 className="font-bold mb-10 text-2xl capitalize">Overview</h2>
    </>
  );
};

export default AdminHome;
