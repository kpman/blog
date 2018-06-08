import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const Header = ({ data }) => (
  <Fragment>
    <div className="mobile-nav-panel">
      <i className="icon-reorder icon-large" />
    </div>
    <header id="header">
      <h1 className="blog-title">
        <Link to="/">{data.site.siteMetadata.title}</Link>
      </h1>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/archives">archives</Link>
          </li>
          <li>
            <OutboundLink
              id="nav-search-btn"
              className="nav-icon"
              title="Search"
            />
          </li>
          <li>
            <OutboundLink
              href="/rss.xml"
              id="nav-rss-link"
              className="nav-icon"
              title="RSS Feed"
            />
          </li>
        </ul>
      </nav>
      <div id="search-form-wrap">
        <form
          action="//google.com/search"
          method="get"
          acceptCharset="UTF-8"
          className="search-form"
        >
          <input
            type="search"
            name="q"
            results="0"
            className="search-form-input"
            placeholder="Search"
          />
          <input
            type="submit"
            value="&#xF002;"
            className="search-form-submit"
          />
          <input
            type="hidden"
            name="q"
            value={`site:${data.site.siteMetadata.siteUrl}`}
          />
        </form>
      </div>
    </header>
  </Fragment>
);

export default Header;
