import React from 'react';

export default ({ data }) => (
  <footer id="footer">
    <h1 className="footer-blog-title">
      <a href="/">{data.site.siteMetadata.title}</a>
    </h1>
    <span className="copyright">
      © {new Date().getFullYear()} {data.site.siteMetadata.title}
      <br />
      Modify from{' '}
      <a
        href="http://sanographix.github.io/tumblr/apollo/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Apollo
      </a>{' '}
      theme.<br />
      Powered by{' '}
      <a
        href="https://www.gatsbyjs.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        Gatsby
      </a>
    </span>
  </footer>
);
