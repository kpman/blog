import Head from 'next/head';
import React from 'react';

import config from '../config';

const SEO = ({ title, description }) => {
  const metaDescription = description || config.description;

  const defaultTitle = config.title;
  const renderTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;

  return (
    <Head>
      <title>{renderTitle}</title>

      <meta name="viewport" content="width=device-width" />
      <meta name="description" content={metaDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={config.siteUrl} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:description" content={metaDescription} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </Head>
  );
};

export default SEO;
