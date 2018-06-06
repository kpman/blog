import React from 'react';
import Link from 'gatsby-link';

const ArticleHeader = ({ slug, title }) => (
  <header className="entry-header">
    <h1 itemProp="name" className="entry-title">
      <Link className="article-title" to={slug} itemProp="url">
        {title}
      </Link>
    </h1>
  </header>
);

export default ArticleHeader;
