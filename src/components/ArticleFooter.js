import React from 'react';
import Link from 'gatsby-link';

const ArticleFooter = ({ slug, date }) => (
  <footer className="entry-meta-header">
    <span className="meta-elements date">
      <Link to={slug} className="article-date">
        <time
          // dateTime={new Date(date).toISOString()}
          itemProp="datePublished"
        >
          {date}
        </time>
      </Link>
    </span>
    <span className="meta-elements author">kpman | code</span>
    <div className="commentscount">
      <Link to={`${slug}#disqus_thread`} className="article-comment-link">
        Comments
      </Link>
    </div>
  </footer>
);

export default ArticleFooter;
