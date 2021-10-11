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
      © {new Date().getFullYear()} {config.title}. All rights reserved.
      <br />
      Modify from{' '}
      <Link href="http://sanographix.github.io/tumblr/apollo/">
        <a rel="noopener noreferrer" target="_blank">
          Apollo
        </a>
      </Link>{' '}
      theme.
      <br />
      Powered by{' '}
      <Link href="https://nextjs.org/">
        <a rel="noopener noreferrer" target="_blank">
          Next.js
        </a>
      </Link>
    </span>
  </footer>
);

export default Footer;
