import Head from 'next/head';
import React from 'react';

import config from '../config';

const SEO = ({
  title: titleFromProps,
  description = config.description,
  ogImageUrl,
  slug,
}) => {
  const siteName = config.title;
  const title = titleFromProps ? `${titleFromProps} - ${siteName}` : siteName;
  const url = slug ? `${config.siteUrl}${slug}` : config.siteUrl;

  return (
    <Head>
      <title>{title}</title>

      <meta name="viewport" content="width=device-width" />
      <meta name="description" content={description} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

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
