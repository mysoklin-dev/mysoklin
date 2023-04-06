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
      <div>Admin Home</div>
    </>
  );
};

export default AdminHome;
