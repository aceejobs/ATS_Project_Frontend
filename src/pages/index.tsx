import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const HomePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return <></>;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      source: '/',
      destination: '/login',
      permanent: true,
    },
  };
};
