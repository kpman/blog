import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { GA_4_TRACKING_ID } from '../lib/constants';

import '../styles/index.css';
import 'highlight.js/styles/github.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (process.env.NODE_ENV === 'production') {
        (
          window as typeof window & {
            gtag: (
              key: string,
              id: string,
              options: Record<string, string>
            ) => void;
          }
        ).gtag('config', GA_4_TRACKING_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
