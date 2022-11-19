import Link from 'next/link';

import config from '../config';

const Header = () => (
  <>
    <div className="mobile-nav-panel">
      <i className="icon-reorder icon-large" />
    </div>
    <header id="header">
      <h1 className="blog-title">
        <Link href="/">
          {config.title}
        </Link>
      </h1>
      <nav className="nav">
        <ul>
          <li>
            <Link href="/">
              home
            </Link>
          </li>
          <li>
            <Link href="/archives">
              archives
            </Link>
          </li>
          <li>
            <Link href="/atom.xml">
              rss
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  </>
);

export default Header;
