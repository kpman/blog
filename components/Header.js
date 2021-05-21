import React from 'react';
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
          <a>{config.title}</a>
        </Link>
      </h1>
      <nav className="nav">
        <ul>
          <li>
            <Link href="/">
              <a>home</a>
            </Link>
          </li>
          <li>
            <Link href="/archives">
              <a>archives</a>
            </Link>
          </li>
          {/* <li>
            <Link
              href="/rss.xml"
              id="nav-rss-link"
              className="nav-icon"
              title="RSS Feed"
            />
          </li> */}
        </ul>
      </nav>
    </header>
  </>
);

export default Header;
