import React from 'react';
import Link from 'gatsby-link';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

export default ({ data }) => (
  <footer id="footer">
    <h1 className="footer-blog-title">
      <Link to="/">{data.site.siteMetadata.title}</Link>
    </h1>
    <span className="copyright">
      © {new Date().getFullYear()} {data.site.siteMetadata.title}
      <br />
      Modify from{' '}
      <OutboundLink
        href="http://sanographix.github.io/tumblr/apollo/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Apollo
      </OutboundLink>{' '}
      theme.<br />
      Powered by{' '}
      <OutboundLink
        href="https://www.gatsbyjs.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        Gatsby
      </OutboundLink>
    </span>
  </footer>
);
