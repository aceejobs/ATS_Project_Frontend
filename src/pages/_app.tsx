// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
// import '@/styles/colors.css';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/globals.css';

import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';

import { persistor, store } from '@/store/store';

import { toastOptions } from '@/config/toastConfig';
import { queryClientConfig } from '@/utils/config/query.config';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

function MyApp({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  const router = useRouter();
  const [showChild, setShowChild] = useState(false);
  const client = new QueryClient(queryClientConfig);

  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 800) setShowMobileWarning(true);
  }, []);

  useEffect(() => {
    setShowChild(true);
  }, []);
  if (!showChild && process.env.NODE_ENV === 'development') {
    return null;
  }

  if (showMobileWarning) {
    return (
      <div className='text-md flex h-screen w-screen items-center justify-center'>
        <p> This Web App can't be viewed on mobile screens.</p>
      </div>
    );
  }

  const getLayout =
    Component.getLayout ??
    ((page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>);
  return (
    <>
      <CookiesProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={client}>
              <Head>
                <link rel='shortcut icon' href='/assets/svg/samll-logo-2.svg' />
              </Head>
              {getLayout(<Component {...pageProps} key={router.pathname} />)}
              <Toaster position='top-right' toastOptions={toastOptions} />
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </CookiesProvider>
    </>
  );
}

export default MyApp;