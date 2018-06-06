import React, { Fragment } from 'react';
import Link from 'gatsby-link';

import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import ArticleMeta from './ArticleMeta';

const Article = ({
  slug,
  html,
  date,
  title,
  tags,
  disqusShortname,
  readmore,
}) => (
  <Fragment>
    <article id={title} className="post">
      <ArticleFooter slug={slug} date={date} />
      <ArticleHeader slug={slug} title={title} />
      <div className="entry-content">
        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: readmore ? html.split('<!-- more -->')[0] : html,
          }}
        />
        {readmore ? (
          <p className="article-more-link">
            <Link to={`${slug}#more`}>Read More</Link>
            <p>{disqusShortname}</p>
          </p>
        ) : null}
      </div>
      <ArticleMeta tags={tags} />
      <hr className="article-devider" />
    </article>
  </Fragment>
);

export default Article;
