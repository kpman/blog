import React from 'react';
import Helmet from 'react-helmet';

import Favicon from '../assets/favicon.png';

const Head = ({ data }) => (
  <Helmet>
    <html lang="en" />

    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="description" content={data.site.siteMetadata.description} />

    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.site.siteMetadata.title} />
    <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
    <meta property="og:site_name" content={data.site.siteMetadata.title} />
    <meta
      property="og:description"
      content={data.site.siteMetadata.description}
    />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={data.site.siteMetadata.title} />
    <meta
      name="twitter:description"
      content={data.site.siteMetadata.description}
    />

    <link rel="icon" type="image/png" sizes="30x30" href={Favicon} />

    <title>{data.site.siteMetadata.title}</title>
  </Helmet>
);

export default Head;

export const query = graphql`
  query HeadQuery {
    site {
      siteMetadata {
        title
        subtitle
        description
        siteUrl
        disqusShortname
      }
    }
  }
`;
