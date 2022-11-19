import Link from 'next/link';

import config from '../config';

const Footer = () => (
  <footer id="footer">
    <h1 className="footer-blog-title">
      <Link href="/">
        {config.title}
      </Link>
    </h1>
    <span className="copyright">
      © {new Date().getFullYear()} {config.title}. All rights reserved.
      <br />
      Modify from{' '}
      <Link
        href="http://sanographix.github.io/tumblr/apollo/"
        rel="noopener noreferrer"
        target="_blank">
        
          Apollo
        
      </Link>{' '}
      theme.
      <br />
      Powered by{' '}
      <Link href="https://nextjs.org/" rel="noopener noreferrer" target="_blank">
        
          Next.js
        
      </Link>
    </span>
  </footer>
);

export default Footer;
