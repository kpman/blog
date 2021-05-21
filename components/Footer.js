import React from 'react';
import Link from 'next/link';

import config from '../config';

const Footer = () => (
  <footer id="footer">
    <h1 className="footer-blog-title">
      <Link href="/">
        <a>{config.title}</a>
      </Link>
    </h1>
    <span className="copyright">
      © {new Date().getFullYear()} {config.title}
      <br />
      Modify from{' '}
      <Link
        href="http://sanographix.github.io/tumblr/apollo/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <a>Apollo</a>
      </Link>{' '}
      theme.<br />
      Powered by{' '}
      <Link
        href="https://nextjs.org/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <a>Next.js</a>
      </Link>
    </span>
  </footer>
);

export default Footer;
